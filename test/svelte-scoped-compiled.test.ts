import { describe, expect, test } from 'vitest'
import { createContext } from '@unocss/shared-integration'
import type { VitePluginConfig } from '@unocss/vite'
import presetUno from '@unocss/preset-uno'
import { transformSFC } from '../packages/vite/src/modes/svelte-scoped-compiled'

describe('svelte-scoped-compiled', () => {
  const ctx = createContext<VitePluginConfig>({
    // mode: 'svelte-scoped-compiled', not required
    presets: [
      presetUno(),
    ],
    shortcuts: [
      { shortcut: 'w-5' },
      // { logo: 'i-logos:svelte-icon w-6em h-6em transform transition-800 hover:rotate-180' },
    ],
  })

  async function transform(code: string) {
    return await transformSFC(code, 'Foo.svelte', ctx)
  }

  test('basic', async () => {
    const result = await transform(`
<div class="bg-red-500 text-xl font-bold border border-gray-200 dark:hover:bg-green-500 transform scale-5">
<div class="foo bar">
<div class="shortcut">

<div class="text-center sm:text-left foo">
  <div class="text-sm font-bold hover:text-red"/>
  <div class="text-sm font-bold hover:text-red"/>
</div>
    `.trim())
    expect(result).toMatchInlineSnapshot(`
      "<div class=\\"uno-pe1esh\\">
      <div class=\\"foo bar\\">
      <div class=\\"uno-7unwxf\\">

      <div class=\\"uno-cbgd7b foo\\">
        <div class=\\"uno-s9yxer\\"/>
        <div class=\\"uno-s9yxer\\"/>
      </div>
      <style>:global(.uno-7unwxf){width:1.25rem;}:global(.uno-pe1esh){--un-scale-x:0.05;--un-scale-y:0.05;transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));border-width:1px;border-style:solid;--un-border-opacity:1;border-color:rgba(229,231,235,var(--un-border-opacity));--un-bg-opacity:1;background-color:rgba(239,68,68,var(--un-bg-opacity));font-size:1.25rem;line-height:1.75rem;font-weight:700;}:global(.dark .uno-pe1esh:hover){--un-bg-opacity:1;background-color:rgba(34,197,94,var(--un-bg-opacity));}:global(.uno-cbgd7b){text-align:center;}:global(.uno-s9yxer){font-size:0.875rem;line-height:1.25rem;font-weight:700;}:global(.uno-s9yxer:hover){--un-text-opacity:1;color:rgba(248,113,113,var(--un-text-opacity));}@media (min-width:global(: 640px)){.uno-cbgd7b{text-align:left;}}</style>"
    `)
  })

  test('different sequence of utility classes', async () => {
    const order1 = await transform('<div class="flex bg-blue-400 my-awesome-class font-bold"></div>')
    const order2 = await transform('<div class="my-awesome-class bg-blue-400  font-bold flex"></div>')
    expect(order1).toBe(order2)
  })

  test('class: syntax works', async () => {
    const result = await transform(`
    <div class="flex"/>
    <div class:flex={bar} />
    `.trim())
    expect(result).toMatchInlineSnapshot(`
      "<div class=\\"uno-kagvzm\\"/>
          <div class:uno-kagvzm={bar} />
      <style>:global(.uno-kagvzm){display:flex;}</style>"
    `)
  })

  test('properly wraps rtl: with :global() wrapper', async () => {
    const result = await transform(`
    <div class="mb-1 text-sm rtl:right-0 space-x-1"></div>`.trim())
    expect(result).toMatchInlineSnapshot(`
      "<div class=\\"uno-05wrs8\\"></div>
      <style>:global([dir=\\"rtl\\"] .uno-05wrs8){right:0rem;}:global(.uno-05wrs8){margin-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;}:global(.uno-05wrs8>:not([hidden])~:not([hidden])){--un-space-x-reverse:0;margin-left:calc(0.25rem * calc(1 - var(--un-space-x-reverse)));margin-right:calc(0.25rem * var(--un-space-x-reverse));}</style>"
    `)
  })

  // Add more tests to cover all use cases in https://github.com/unocss/unocss/issues/1676:
})
