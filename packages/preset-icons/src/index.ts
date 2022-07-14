import type { Preset } from '@unocss/core'
import { warnOnce } from '@unocss/core'
import type {
  IconifyLoaderOptions,
  UniversalIconLoader,
} from '@iconify/utils/lib/loader/types'
import { loadIcon } from '@iconify/utils'
import { encodeSvgForCss } from '@iconify/utils/lib/svg/encode-svg-for-css'
import { isNode, isVSCode } from './utils'
import type { IconsOptions } from './types'
import { createCDNLoader } from './cdn'

const COLLECTION_NAME_PARTS_MAX = 3

export { IconsOptions }

export const preset = (options: IconsOptions = {}): Preset => {
  const {
    scale = 1,
    mode = 'auto',
    prefix = 'i-',
    warn = false,
    collections: customCollections,
    extraProperties = {},
    customizations = {},
    autoInstall = false,
    layer = 'icons',
    unit,
    cdn,
  } = options

  const loaderOptions: IconifyLoaderOptions = {
    addXmlNs: true,
    scale,
    customCollections,
    autoInstall,
    // avoid warn from @iconify/loader: we'll warn below if not found
    warn: undefined,
    customizations: {
      ...customizations,
      additionalProps: { ...extraProperties },
      trimCustomSvg: true,
      async iconCustomizer(collection, icon, props) {
        await customizations.iconCustomizer?.(collection, icon, props)
        if (unit) {
          if (!props.width)
            props.width = `${scale}${unit}`
          if (!props.height)
            props.height = `${scale}${unit}`
        }
      },
    },
  }

  async function lookupIconLoader(): Promise<UniversalIconLoader> {
    if (cdn)
      return createCDNLoader(cdn)
    if (isNode && !isVSCode) {
      try {
        return await import('@iconify/utils/lib/loader/node-loader').then(i => i?.loadNodeIcon)
      }
      catch {}
      try {
        return require('@iconify/utils/lib/loader/node-loader.cjs')
      }
      catch {}
    }
    return loadIcon
  }

  let iconLoader: UniversalIconLoader

  return {
    name: '@unocss/preset-icons',
    enforce: 'pre',
    options,
    layers: { icons: -30 },
    rules: [[
      /^([a-z0-9:-]+)(?:\?(mask|bg|auto))?$/,
      async ([full, body, _mode = mode]) => {
        let collection = ''
        let name = ''
        let svg: string | undefined

        iconLoader = iconLoader || await lookupIconLoader()

        const usedProps = {}
        if (body.includes(':')) {
          [collection, name] = body.split(':')
          svg = await iconLoader(collection, name, { ...loaderOptions, usedProps })
        }
        else {
          const parts = body.split(/-/g)
          for (let i = COLLECTION_NAME_PARTS_MAX; i >= 1; i--) {
            collection = parts.slice(0, i).join('-')
            name = parts.slice(i).join('-')
            svg = await iconLoader(collection, name, { ...loaderOptions, usedProps })
            if (svg)
              break
          }
        }

        if (!svg) {
          if (warn)
            warnOnce(`failed to load icon "${full}"`)
          return
        }

        const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`

        if (_mode === 'auto')
          _mode = svg.includes('currentColor') ? 'mask' : 'bg'

        if (_mode === 'mask') {
          // Thanks to https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images
          return {
            '--un-icon': url,
            'mask': 'var(--un-icon) no-repeat',
            'mask-size': '100% 100%',
            '-webkit-mask': 'var(--un-icon) no-repeat',
            '-webkit-mask-size': '100% 100%',
            'background-color': 'currentColor',
            ...usedProps,
          }
        }
        else {
          return {
            'background': `${url} no-repeat`,
            'background-size': '100% 100%',
            'background-color': 'transparent',
            ...usedProps,
          }
        }
      },
      { layer, prefix },
    ]],
  }
}

export default preset
