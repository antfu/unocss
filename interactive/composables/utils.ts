import { uniq } from '@unocss/core'
import type { ResultItem, RuleItem } from '~/types'
import { mdnIndex } from '~/data/mdn-index'

export function extractColors(css: string) {
  return Array.from(css.matchAll(/\brgba?\((.+?)\)/g))
    .map((i) => {
      const [r, g, b, a] = i[1].split(',').map(i => parseInt(i.trim()))
      if (Number.isNaN(r))
        return ''
      if (!Number.isNaN(a))
        return `rgba(${r}, ${g}, ${b}, ${a})`
      return `rgb(${r}, ${g}, ${b})`
    })
    .filter(Boolean)
}

export function getFeatureUsage(css: string) {
  const props = uniq([...css.matchAll(/^\s+(\w[\w-]+)\:/mg)].map(i => i[1]))
  const functions = uniq([...css.matchAll(/\b(\w+)\(/mg)].map(i => `${i[1]}()`))
  return [...props, ...functions]
    .filter(i => mdnIndex.find(s => s.title === i))
}

export function getDocs(item: RuleItem) {
  return item.features?.map(i => mdnIndex.find(s => s.title === i)!) || []
}

export function getUtilsOfFeature(name: string) {
  return [...(featuresMap.get(name) || [])]
}

export function findAlias(item: RuleItem) {
  return [...matchedMap.values()].filter(i => i.body === item.body && i.class !== item.class)
}

export function goRandom() {
  const keys = Array.from(matchedMap.keys())
  const index = Math.round(keys.length * Math.random())
  useRouter().push({ query: { s: keys[index] } })
}

export function sampleArray<T>(arr: T[], count: number) {
  return Array.from({ length: count }, _ => arr[Math.round(Math.random() * (arr.length - 1))])
}

export function getItemId(item: ResultItem) {
  if (item.type !== 'rule')
    return `${item.type}:${item.title}`
  return item.class
}
