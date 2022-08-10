import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetTypography from '@unocss/preset-typography'
import presetTagify from '@unocss/preset-tagify'
import presetWind from '@unocss/preset-wind'
import type { UnocssNuxtOptions } from './types'

export function resolveOptions<T>(options: UnocssNuxtOptions<T>) {
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
      const option = options[key as keyof UnocssNuxtOptions<T>]
      if (option)
        options.presets.push((preset as (options?: typeof option) => any)(typeof option === 'boolean' ? {} : option)) // HACK It's tedious to type them all
    }
  }
}
