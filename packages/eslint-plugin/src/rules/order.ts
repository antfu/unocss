import { join } from 'path'
import { ESLintUtils } from '@typescript-eslint/utils'
import { createSyncFn } from 'synckit'
import type { RuleListener } from '@typescript-eslint/utils/dist/ts-eslint'
import type { TSESTree } from '@typescript-eslint/types'
import { distDir } from '../dirs'

const sortClasses = createSyncFn<(classes: string) => Promise<string>>(join(distDir, 'worker-sort.cjs'))

export default ESLintUtils.RuleCreator(name => name)({
  name: 'order',
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: {
      description: 'Order',
      recommended: false,
    },
    messages: {
      'invalid-order': 'UnoCSS utilities are not ordered',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkLiteral(node: TSESTree.Literal) {
      if (typeof node.value !== 'string')
        return
      const input = node.value as string
      const sorted = sortClasses(input)
      if (sorted !== input) {
        context.report({
          node,
          messageId: 'invalid-order',
          fix(fixer) {
            return fixer.replaceText(node, `"${sorted}"`)
          },
        })
      }
    }

    const scriptVisitor: RuleListener = {
      JSXAttribute(node) {
        if (typeof node.name.name === 'string' && ['classname', 'class'].includes(node.name.name.toLowerCase()) && node.value) {
          if (node.value.type === 'Literal')
            checkLiteral(node.value)
        }
      },
    }

    const templateBodyVisitor: RuleListener = {
      // VStartTag(node) {
      //   console.log('VStartTag', node)
      // },
      VAttribute(node: any) {
        if (node.key.name === 'class') {
          if (node.value.type === 'VLiteral')
            checkLiteral(node.value)
        }
        // console.log('VAttribute', node)
      },
    }

    // @ts-expect-error missing-types
    if (context.parserServices == null || context.parserServices.defineTemplateBodyVisitor == null) {
      return scriptVisitor
    }
    else {
      // For Vue
      // @ts-expect-error missing-types
      return context.parserServices?.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor)
    }
  },
})
