import { Rule, CSSValues } from '@unocss/core'
import { xyzMap, handler as h } from '../utils'
import { CONTROL_BYPASS_PSEUDO } from '../variants/pseudo'

const transformBase = {
  '--un-rotate': 0,
  '--un-scale-x': 1,
  '--un-scale-y': 1,
  '--un-scale-z': 1,
  '--un-skew-x': 0,
  '--un-skew-y': 0,
  '--un-translate-x': 0,
  '--un-translate-y': 0,
  '--un-translate-z': 0,
  'transform': 'rotate(var(--un-rotate)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z))',
  [CONTROL_BYPASS_PSEUDO]: '',
}

const transformGpu = {
  transform: 'rotate(var(--un-rotate)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))',
  [CONTROL_BYPASS_PSEUDO]: '',
}

export const transforms: Rule[] = [
  ['transform', transformBase],
  [/^preserve-(3d|flat)$/, ([, value]) => ({ 'transform-style': value === '3d' ? `preserve-${value}` : value })],
  [/^translate()-([^-]+)$/, handleTranslate],
  [/^translate-([xyz])-([^-]+)$/, handleTranslate],
  [/^scale()-([^-]+)$/, handleScale],
  [/^scale-([xyz])-([^-]+)$/, handleScale],
  [/^rotate-([^-]+)(?:deg)?$/, handleRotate],
  ['transform-gpu', transformGpu],
  ['origin-center', { 'transform-origin': 'center' }],
  ['origin-top', { 'transform-origin': 'top' }],
  ['origin-top-right', { 'transform-origin': 'top right' }],
  ['origin-right', { 'transform-origin': 'right' }],
  ['origin-bottom-right', { 'transform-origin': 'bottom right' }],
  ['origin-bottom', { 'transform-origin': 'bottom' }],
  ['origin-bottom-left', { 'transform-origin': 'bottom left' }],
  ['origin-left', { 'transform-origin': 'left' }],
  ['origin-top-left', { 'transform-origin': 'top left' }],
]

function handleTranslate([, d, b]: string[]): CSSValues | undefined {
  const v = h.bracket.fraction.rem(b)
  if (v != null) {
    return [
      transformBase,
      [
        ...xyzMap[d].map((i): [string, string] => [`--un-translate${i}`, v]),
      ],
    ]
  }
}

function handleScale([, d, b]: string[]): CSSValues | undefined {
  const v = h.bracket.fraction.percent(b)
  if (v != null) {
    return [
      transformBase,
      [
        ...xyzMap[d].map((i): [string, string] => [`--un-scale${i}`, v]),
      ],
    ]
  }
}

function handleRotate([, b]: string[]): CSSValues | undefined {
  const v = h.bracket.number(b)
  if (v != null) {
    return [
      transformBase,
      { '--un-rotate': `${v}deg` },
    ]
  }
}
