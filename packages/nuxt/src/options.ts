import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetTypography from '@unocss/preset-typography'
import presetTagify from '@unocss/preset-tagify'
import presetWind from '@unocss/preset-wind'
import { defaultPipelineExclude } from '../../shared-integration/src/defaults'
import type { UnocssNuxtOptions } from './types'

export function resolveOptions(options: UnocssNuxtOptions) {
  if (options.presets == null) {
    options.presets = []
    const presetMap = {
      uno: presetUno,
      attributify: presetAttributify,
      tagify: presetTagify,
      icons: presetIcons,
      webFonts: presetWebFonts,
      typography: presetTypography,
      wind: presetWind,
    }
    for (const [key, preset] of Object.entries(presetMap)) {
      const option = options[key as keyof UnocssNuxtOptions]
      if (option)
        options.presets.push(preset(typeof option === 'boolean' ? {} : option))
    }
  }

  options.content ??= {}
  options.content.pipeline ??= {}
  if (options.content.pipeline !== false) {
    options.content.pipeline.exclude ??= defaultPipelineExclude
    if (Array.isArray(options.content.pipeline.exclude))
    // ignore macro files created by Nuxt
      options.content.pipeline.exclude.push(/\?macro=true/)
  }
}
