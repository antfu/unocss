import type { VariantObject } from '@unocss/core'
import { escapeRegExp, escapeSelector, warnOnce } from '@unocss/core'
import type { PresetMiniOptions } from '..'
import { getComponent, handler as h } from '../_utils'

const PseudoClasses: Record<string, string> = Object.fromEntries([
  // pseudo elements part 1
  ['first-letter', '::first-letter'],
  ['first-line', '::first-line'],

  // location
  'any-link',
  'link',
  'visited',
  'target',
  ['open', '[open]'],

  // user action
  'hover',
  'active',
  'focus-visible',
  'focus-within',
  'focus',

  // input
  'autofill',
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',

  // tree-structural
  'root',
  'empty',
  ['even-of-type', ':nth-of-type(even)'],
  ['even', ':nth-child(even)'],
  ['odd-of-type', ':nth-of-type(odd)'],
  ['odd', ':nth-child(odd)'],
  'first-of-type',
  ['first', ':first-child'],
  'last-of-type',
  ['last', ':last-child'],
  'only-child',
  'only-of-type',

  // pseudo elements part 2
  ['placeholder', '::placeholder'],
  ['before', '::before'],
  ['after', '::after'],
  ['selection', '::selection'],
  ['marker', '::marker'],
  ['file', '::file-selector-button'],
].map(key => Array.isArray(key) ? key : [key, `:${key}`]))

const PseudoClassesColon: Record<string, string> = Object.fromEntries([
  ['backdrop', '::backdrop'],
].map(key => Array.isArray(key) ? key : [key, `:${key}`]))

const PseudoClassFunctions = [
  'not',
  'is',
  'where',
  'has',
]

const PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith('::')).map(([key]) => key).join('|')
const PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith('::')).map(([key]) => key).join('|')
const PseudoClassFunctionsStr = PseudoClassFunctions.join('|')

const sortValue = (pseudo: string) => {
  if (pseudo === 'active')
    return 1
}

const taggedPseudoClassMatcher = (tag: string, parent: string, combinator: string): VariantObject => {
  const rawRe = new RegExp(`^(${escapeRegExp(parent)}(?:<[^>]+>)?:)(\\S+)${escapeRegExp(combinator)}\\1`)
  const maybeWithBracketRE = new RegExp(`^${tag}(?:<[^>]+>)?-\\[`)
  const pseudoRE = new RegExp(`^${tag}(<[^>]+>)?-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))[:-]`)
  const pseudoColonRE = new RegExp(`^${tag}(<[^>]+>)?-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))[:]`)
  return {
    name: `pseudo:${tag}`,
    match(input: string) {
      if (!input.startsWith(tag))
        return

      if (input.match(maybeWithBracketRE)) {
        const labelMatcher = input.substring(tag.length)
        const [label, afterLabel] = getComponent(labelMatcher, '<', '>', '-') ?? ['', labelMatcher.slice(1)]
        const body = getComponent(afterLabel, '[', ']', [':', '-'])

        if (!body)
          return

        const [match, rest] = body
        const bracketValue = h.bracket(match)

        if (bracketValue == null)
          return

        if (label)
          warnOnce('The labeled pseudo is experimental and may be changed in breaking ways at any time.')

        let prefix = `${parent}${escapeSelector(label)}`
        prefix = bracketValue.includes('&') ? bracketValue.replace(/&/g, prefix) : `${prefix}${bracketValue}`

        return {
          matcher: input.slice(input.length - rest.length),
          handle: (input, next) => next({
            ...input,
            prefix: `${prefix}${combinator}${input.prefix}`.replace(rawRe, '$1$2:'),
          }),
        }
      }

      const match = input.match(pseudoRE) || input.match(pseudoColonRE)
      if (match) {
        const [original, label = '', fn, pseudoKey] = match
        if (label)
          warnOnce('The labeled pseudo is experimental and may be changed in breaking ways at any time.')
        let pseudo = PseudoClasses[pseudoKey] || PseudoClassesColon[pseudoKey] || `:${pseudoKey}`
        if (fn)
          pseudo = `:${fn}(${pseudo})`
        return {
          matcher: input.slice(original.length),
          handle: (input, next) => next({
            ...input,
            prefix: `${parent}${escapeSelector(label)}${pseudo}${combinator}${input.prefix}`.replace(rawRe, '$1$2:'),
            sort: sortValue(pseudoKey),
          }),
        }
      }
    },
    multiPass: true,
  }
}

const PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).join('|')
const PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).join('|')
const PseudoClassesAndElementsRE = new RegExp(`^(${PseudoClassesAndElementsStr})[:-]`)
const PseudoClassesAndElementsColonRE = new RegExp(`^(${PseudoClassesAndElementsColonStr})[:]`)
export const variantPseudoClassesAndElements: VariantObject = {
  name: 'pseudo',
  match: (input: string) => {
    const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE)
    if (match) {
      const pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`
      return {
        matcher: input.slice(match[0].length),
        handle: (input, next) => {
          const selectors = pseudo.startsWith('::')
            ? {
                pseudo: `${input.pseudo}${pseudo}`,
              }
            : {
                selector: `${input.selector}${pseudo}`,
              }

          return next({
            ...input,
            ...selectors,
            sort: sortValue(match[1]),
          })
        },
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassesAndElementsStr}):`,
}

const PseudoClassFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})[:-]`)
const PseudoClassColonFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})[:]`)
export const variantPseudoClassFunctions: VariantObject = {
  match: (input: string) => {
    const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE)
    if (match) {
      const fn = match[1]
      const pseudo = PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`
      return {
        matcher: input.slice(match[0].length),
        selector: s => `${s}:${fn}(${pseudo})`,
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`,
}

export const variantTaggedPseudoClasses = (options: PresetMiniOptions = {}): VariantObject[] => {
  const attributify = !!options?.attributifyPseudo

  return [
    taggedPseudoClassMatcher('group', attributify ? '[group=""]' : '.group', ' '),
    taggedPseudoClassMatcher('peer', attributify ? '[peer=""]' : '.peer', '~'),
    taggedPseudoClassMatcher('parent', attributify ? '[parent=""]' : '.parent', '>'),
    taggedPseudoClassMatcher('previous', attributify ? '[previous=""]' : '.previous', '+'),
  ]
}

const PartClassesRE = /(part-\[(.+)]:)(.+)/
export const partClasses: VariantObject = {
  match: (input: string) => {
    const match = input.match(PartClassesRE)
    if (match) {
      const part = `part(${match[2]})`
      return {
        matcher: input.slice(match[1].length),
        selector: s => `${s}::${part}`,
      }
    }
  },
  multiPass: true,
}
