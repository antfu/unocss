import type { Extractor } from '@unocss/core'
import { defaultSplitRE, isValidSelector } from '@unocss/core'

export const quotedArbitraryValuesRE = /(?:[\w&:[\]-]|\[\S+=\S+\])+\[\\?['"]?\S+?['"]\]\]?[\w:-]*/g
export const arbitraryPropertyRE = /\[(\\\W|[\w-])+:[^\s:]*?("\S+?"|'\S+?'|`\S+?`|[^\s:]+?)[^\s:]*?\)?\]/g
const arbitraryPropertyCandidateRE = /^\[(\\\W|[\w-])+:['"]?\S+?['"]?\]$/

export function splitCodeWithArbitraryVariants(code: string): string[] {
  const result: string[] = []

  for (const match of code.matchAll(arbitraryPropertyRE)) {
    if (!code[match.index! - 1]?.match(/^[\s'"`]/))
      continue

    result.push(match[0])
  }

  for (const match of code.matchAll(quotedArbitraryValuesRE))
    result.push(match[0])

  code
    .split(defaultSplitRE)
    .forEach((match) => {
      if (isValidSelector(match) && !arbitraryPropertyCandidateRE.test(match))
        result.push(match)
    })

  return result
}

export const extractorArbitraryVariants: Extractor = {
  name: '@unocss/extractor-arbitrary-variants',
  order: 0,
  extract({ code }) {
    return splitCodeWithArbitraryVariants(code)
  },
}

export default extractorArbitraryVariants
