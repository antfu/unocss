import type { CSSEntry, CSSObject, DynamicMatcher, ParsedColorValue, RuleContext } from '@unocss/core'
import { hex2rgba } from '@unocss/core'
import type { Theme } from '../theme'
import { handler as h } from './handlers'
import { directionMap } from './mappings'

export function capitalize<T extends string>(str: T) {
  return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>
}

/**
 * Provide {@link DynamicMatcher} function returning spacing definition. See spacing rules.
 *
 * @param {string} propertyPrefix - Property for the css value to be created. Postfix will be appended according to direction matched.
 * @return {DynamicMatcher}  {@link DynamicMatcher}
 * @see {@link directionMap}
 */
export const directionSize = (propertyPrefix: string): DynamicMatcher => ([_, direction, size]: string[]): CSSEntry[][] | undefined => {
  const v = h.bracket.auto.rem.fraction.cssvar(size)
  if (v !== undefined) {
    return [
      directionMap[direction].map(i => [`${propertyPrefix}${i}`, v] as CSSEntry),
    ]
  }
}

/**
 * Obtain color from theme by camel-casing colors.
 */
const getThemeColor = (theme: Theme, colors: string[]) =>
  theme.colors?.[
    colors.join('-').replace(/(-[a-z])/g, n => n.slice(1).toUpperCase())
  ]

/**
 * Parse color string into rgba (if possible) with opacity opacity. Color value will be matched to theme object before converting to rgb value.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * '#f12' // Hex color
 * 'hex-f12' // Alternative hex color
 * '[rgb(100,2,3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
 *
 * @param {string} body - Color string to be parsed.
 * @param {Theme} theme - {@link Theme} object.
 * @return {ParsedColorValue|undefined}  {@link ParsedColorValue} object if string is parseable.
 */
export const parseColor = (body: string, theme: Theme): ParsedColorValue | undefined => {
  const [main, opacity] = body.split(/(?:\/|:)/)
  const colors = main
    .replace(/([a-z])([0-9])/g, '$1-$2')
    .split(/-/g)
  const [name] = colors

  if (!name)
    return

  let color: string | undefined
  const bracket = h.bracket(main)
  const bracketOrMain = bracket || main

  if (bracketOrMain.startsWith('#'))
    color = bracketOrMain.slice(1)
  if (bracketOrMain.startsWith('hex-'))
    color = bracketOrMain.slice(4)

  color = color || bracket

  let no = 'DEFAULT'
  if (!color) {
    let colorData
    const [scale] = colors.slice(-1)
    if (scale.match(/^\d+$/)) {
      no = scale
      colorData = getThemeColor(theme, colors.slice(0, -1))
    }
    else {
      colorData = getThemeColor(theme, colors)
      if (!colorData) {
        [, no = no] = colors
        colorData = getThemeColor(theme, [name])
      }
    }

    if (typeof colorData === 'string')
      color = colorData
    else if (no && colorData)
      color = colorData[no]
  }

  return {
    opacity,
    name,
    no,
    color,
    rgba: hex2rgba(color),
  }
}

/**
 * Provide {@link DynamicMatcher} function to produce color value matched from rule.
 *
 * @see {@link parseColor}
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @example Resolving 'red-100' from theme:
 * colorResolver('background-color', 'background')('', 'red-100')
 * return { '--un-background-opacity': '1', 'background-color': 'rgba(254,226,226,var(--un-bg-opacity))' }
 *
 * @example Resolving 'red-100/20' from theme:
 * colorResolver('background-color', 'background')('', 'red-100/20')
 * return { 'background-color': 'rgba(204,251,241,0.22)' }
 *
 * @example Resolving 'hex-124':
 * colorResolver('color', 'text')('', 'hex-124')
 * return { '--un-text-opacity': '1', 'color': 'rgba(17,34,68,var(--un-text-opacity))' }
 *
 * @param {string} property - Property for the css value to be created.
 * @param {string} varName - Base name for the opacity variable.
 * @return {DynamicMatcher}  {@link DynamicMatcher} object.
 */
export const colorResolver = (property: string, varName: string): DynamicMatcher => ([, body]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined => {
  const data = parseColor(body, theme)

  if (!data)
    return

  const { opacity, color, rgba } = data

  if (!color)
    return

  const a = opacity
    ? opacity[0] === '['
      ? h.bracket.percent(opacity)!
      : (parseFloat(opacity) / 100)
    : rgba?.[3]

  if (rgba) {
    if (a != null && !Number.isNaN(a)) {
      // @ts-expect-error
      rgba[3] = typeof a === 'string' && !a.includes('%')
        ? parseFloat(a)
        : a
      return {
        [property]: `rgba(${rgba.join(',')})`,
      }
    }
    else {
      return {
        [`--un-${varName}-opacity`]: 1,
        [property]: `rgba(${rgba.slice(0, 3).join(',')},var(--un-${varName}-opacity))`,
      }
    }
  }
  else {
    return {
      [property]: color.replace('%alpha', `${a || 1}`),
    }
  }
}
