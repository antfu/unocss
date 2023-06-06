import type { UserConfig } from '@unocss/core'
import { escapeSelector } from '@unocss/core'
import presetWind from '@unocss/preset-wind'
import postcssPlugin from '@unocss/postcss'
import { describe, expect, test } from 'vitest'
import postcss from 'postcss'
import { presetWindTargets } from './assets/preset-wind-targets'

const config: UserConfig = {
  content: {
    filesystem: [
      './test/assets/preset-wind-targets.ts',
    ],
    inline: [{
      code: presetWindTargets.join(' '),
      id: 'targets.html',
    }],
  },
  presets: [
    presetWind({
      dark: 'media',
    }),
  ],
  theme: {
    colors: {
      custom: {
        a: 'var(--custom)',
        b: 'rgba(var(--custom), %alpha)',
      },
    },
    data: {
      dropdown: 'data-bs-toggle="dropdown"',
    },
    container: {
      center: true,
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'lg': '4rem',
        'xl': '5rem',
        '2xl': '6rem',
      },
    },
  },
}

function pcss() {
  return postcss(
    postcssPlugin({
      content: [
        './test/assets/preset-wind-targets.ts',
        {
          raw: presetWindTargets.join(' '), extension: 'html',
        },
      ],
      configOrPath: config,
    }))
}

function pcssLite() {
  return postcss(
    postcssPlugin({
      configOrPath: {
        content: {
          filesystem: [],
          inline: [
            {
              code: '<div class="relative p4 test example">',
              id: 'inline.html',
            },
          ],
        },
        presets: [
          presetWind(),
          {
            rules: [
              ['example', { color: 'red' }, { layer: 'my-layer' }],
            ],
          },
        ],
        shortcuts: {
          test: 'p5',
        },
      } as UserConfig,
    }))
}

const file = 'style.css'
const processOptions = { from: file, to: file }

describe('postcss', () => {
  test('@unocss', async () => {
    const { css } = await pcss().process('@unocss;', processOptions)

    const targets = presetWindTargets

    const unmatched = []
    for (const i of targets) {
      if (!css.includes(escapeSelector(i)))
        unmatched.push(i)
    }
    expect(unmatched).toEqual([])
    expect(css).toMatchSnapshot()
  })

  test('@unocss layers', async () => {
    const { css } = await pcssLite().process('@unocss shortcuts, default;@unocss preflights;@unocss;', processOptions)

    expect(css).toMatchSnapshot()
  })

  test('@unocss all layers', async () => {
    const { css } = await pcssLite().process('@unocss preflights;@unocss all;', processOptions)

    expect(css).toMatchSnapshot()
  })

  test('@apply', async () => {
    const { css } = await pcssLite().process('div{@apply bg-red hover:text-white dark:hover:[&>:focus]:text-[20px];}', processOptions)

    expect(css).toMatchSnapshot()
  })

  test('theme()', async () => {
    const { css } = await pcssLite().process('div{color:theme(\'colors.red.600\')}', processOptions)

    expect(css).toMatchSnapshot()
  })

  test('@screen', async () => {
    const { css } = await pcssLite().process(`@screen at-md {
      div{@apply bg-red hover:text-white dark:hover:[&>:focus]:text-[20px];}
      div{color:theme(\'colors.red.600\')}
    }`, processOptions)

    expect(css).toMatchSnapshot()
  })
})
