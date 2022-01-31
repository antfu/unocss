import type { Variant } from '@unocss/core'
import { handler as h } from '../utils'

export const variantImportant: Variant = {
  match(matcher) {
    if (matcher.startsWith('!')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            if (v[1])
              v[1] += ' !important'
          })
          return body
        },
      }
    }
  },
}

export const variantNegative: Variant = {
  match(matcher) {
    if (matcher.startsWith('-')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            if (v[0].startsWith('--un-scale') || v[1]?.toString() === '0')
              return
            v[1] = v[1]?.toString().replace(/[0-9.]+(?:[a-z]+|%)?/, i => `-${i}`)
          })
          return body
        },
      }
    }
  },
}

export const variantScope: Variant = {
  match(matcher) {
    const match = matcher.match(/^scope-class-(\[.+?\])[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(13 + match[1].length),
        selector: s => `${s} .${h.bracket(match[1])}`,
      }
    }
  },
}
