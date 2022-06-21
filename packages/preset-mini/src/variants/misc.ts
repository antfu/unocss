import type { Variant } from '@unocss/core'

export const variantSelector: Variant = {
  name: 'selector',
  match(matcher) {
    const match = matcher.match(/^selector-\[(.+?)\][:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: () => match[1],
      }
    }
  },
}

export const variantCssLayer: Variant = {
  name: 'layer',
  match(matcher) {
    const match = matcher.match(/^layer-([_\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        parent: `@layer ${match[1]}`,
      }
    }
  },
}

export const variantInternalLayer: Variant = {
  name: 'uno-layer',
  match(matcher) {
    const match = matcher.match(/^uno-layer-([_\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        layer: match[1],
      }
    }
  },
}

export const variantScope: Variant = {
  name: 'scope',
  match(matcher) {
    const match = matcher.match(/^scope-([_\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: s => `.${match[1]} $$ ${s}`,
      }
    }
  },
}

