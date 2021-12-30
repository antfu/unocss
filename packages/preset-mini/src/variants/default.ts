import type { Variant } from '@unocss/core'
import type { Theme } from '../theme'
import { variantBreakpoints } from './breakpoints'
import { variantCombinators } from './combinators'
import { variantColorsMediaOrClass } from './dark'
import { variantImportant, variantNegative, variantSpace } from './misc'
import { variantOrientations } from './orientations'
import { variantPrint } from './prints'
import { partClasses, variantPseudoClassFunctions, variantPseudoClasses, variantPseudoElements, variantTaggedPseudoClasses } from './pseudo'

export const variants: Variant<Theme>[] = [
  variantSpace,
  variantNegative,
  variantImportant,
  variantPrint,
  ...variantOrientations,
  variantBreakpoints,
  ...variantCombinators,
  variantPseudoClasses,
  variantPseudoClassFunctions,
  variantTaggedPseudoClasses,
  variantPseudoElements,
  partClasses,
  ...variantColorsMediaOrClass,
]
