import type { Rule } from '@unocss/core'
import { CONTROL_SHORTCUT_NO_MERGE } from '@unocss/core'
import { directionSize } from '@unocss/preset-mini/utils'

export const scrolls: Rule[] = [
  // snap type
  [/^snap-(x|y|both)$/, ([, d]) => [
    {
      '--un-scroll-snap-strictness': 'proximity',
      [CONTROL_SHORTCUT_NO_MERGE]: '',
    },
    {
      'scroll-snap-type': `${d} var(--un-scroll-snap-strictness)`,
    },
  ]],
  ['snap-mandatory', { '--un-scroll-snap-strictness': 'mandatory' }],
  ['snap-proximity', { '--un-scroll-snap-strictness': 'proximity' }],
  ['snap-none', { 'scroll-snap-type': 'none' }],

  // snap align
  ['snap-start', { 'scroll-snap-align': 'start' }],
  ['snap-end', { 'scroll-snap-align': 'end' }],
  ['snap-center', { 'scroll-snap-align': 'center' }],
  ['snap-align-none', { 'scroll-snap-align': 'none' }],

  // snap stop
  ['snap-normal', { 'scroll-snap-stop': 'normal' }],
  ['snap-always', { 'scroll-snap-stop': 'always' }],

  // scroll margin
  [/^scroll-ma?()-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([xyno])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([rltbsekd])-?(-?.+)$/, directionSize('scroll-margin')],

  // scroll padding
  [/^scroll-pa?()-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([xyno])-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([rltbsekd])-?(-?.+)$/, directionSize('scroll-padding')],
]
