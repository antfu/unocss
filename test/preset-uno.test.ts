import { createGenerator, escapeSelector } from '@unocss/core'
import presetUno from '@unocss/preset-uno'

const targets = [
  '-gap-y-5',
  '-m-auto',
  '!hover:px-10',
  '!p-5px',
  'all:m-auto',
  'bg-[#153]/10',
  'bg-[#1533]',
  'bg-[#1533]/10',
  'bg-#452233/40',
  'bg-auto',
  'bg-blend-normal',
  'bg-blend-color-burn',
  'bg-blend-luminosity',
  'bg-bottom',
  'bg-clip-border',
  'bg-clip-text',
  'bg-cover',
  'bg-fixed',
  'bg-gradient-to-t',
  'bg-gradient-to-tl',
  'bg-hex-452233/40',
  'bg-local',
  'bg-no-repeat',
  'bg-none',
  'bg-origin-border',
  'bg-opacity-45',
  'bg-repeat-space',
  'bg-right-bottom',
  'bg-scroll',
  'bg-red-100',
  'bg-teal-100/55',
  'bg-teal-200:55',
  'bg-teal-300:[.55]',
  'bg-teal-400/[.55]',
  'bg-teal-500/[55%]',
  'border-2',
  'border-b',
  'border-collapse',
  'border-green-100/10',
  'border-separate',
  'border-t-2',
  'border',
  // divide
  'divide',
  'divide-y-4',
  'divide-x-4',
  'divide-x-reverse',
  'divide-green-500',
  'divide-opacity-50',
  'divide-dashed',
  'divide-dotted',
  'divide-transparent',
  'divide-current',
  'caption-top',
  'caption-bottom',
  'children:m-auto',
  'dark:not-odd:text-red',
  'dark:text-xl',
  'duration-111',
  'flex-[hi]',
  'flex',
  'font-mono',
  'from-current',
  'from-green-500',
  'from-transparent',
  'gap-4',
  'gap-x-1',
  'grid-cols-[1fr,2fr,100px,min-content]',
  'grid-cols-2',
  'grid-rows-[1fr,2fr,100px,min-content]',
  'grid-rows-3',
  'grid',
  'auto-rows-min',
  'auto-rows-fr',
  'row-auto',
  'auto-cols-auto',
  'auto-rows-auto',
  'col-span-1',
  'row-span-full',
  'row-end-1',
  'row-start-full',
  'auto-flow-cols-dense',
  'h-1',
  'hover:!p-1',
  'inline-table',
  'first:p-2',
  'not-hover:p-3',
  'group-focus:p-4',
  'group-hover:group-focus:text-center',
  'hover:not-first:checked:bg-red/10',
  'hover:p-5',
  'leading-2',
  'light:text-sm',
  'm-[3em]',
  'm-0',
  'm-1/2',
  'm-auto',
  'max-h-[1px]',
  'max-w-screen-lg',
  'min-w-screen-md',
  'min-h-3',
  'min-w-3',
  'min-h-[5rem]',
  'min-h-full',
  'h-$var',
  'max-w-$var',
  'aspect-ratio-auto',
  'aspect-ratio-3/2',
  'aspect-ratio-0.7',
  'aspect-ratio-$var',
  'aspect-ratio-[auto_16/9]',
  'md:!hidden',
  'md:m-1',
  'mix-blend-normal',
  'mix-blend-color-light',
  'my-auto',
  'op-10',
  'opacity-0',
  'opacity-$opa',
  'order-first',
  'overflow-auto',
  'overflow-x-scroll',
  'overscroll-x-auto',
  'overscroll-contain',
  'p-2',
  'p-t-2',
  'p2',
  'pl-10px',
  'pt-2',
  'pt2',
  'rounded-[4px]',
  'rounded-1/2',
  'rounded-full',
  'rounded-md',
  'rounded-rb-1/2',
  'rounded-t-sm',
  'rounded-tr',
  'rounded',
  'sm:m-1',
  'sm:m1',
  'lt-sm:m1',
  'lt-lg:m2',
  'table',
  'table-auto',
  'table-caption',
  'table-empty-cells-visible',
  'table-empty-cells-hidden',
  'table-footer-group',
  'table-row-group',
  'text-[#124]',
  'text-4xl',
  'text-base',
  'text-black/10',
  'text-blue',
  'text-lg',
  'text-red-100',
  'text-red-200/10',
  'text-red-300/20',
  'text-red100',
  'text-red2',
  'to-current',
  'to-green-500',
  'to-transparent',
  'top-0',
  'top-$top-height',
  'tracking-wide',
  'transition-none',
  'transition-delay-300',
  'transition-duration-300',
  'transition-property-width',
  'transition-property-all',
  'transition-200',
  'transition',
  'w-1/2',
  '-z-1',
  'z-0',
  'z-1',
  'z-100',
  'box-content',
  'box-border',
  'shadow',
  'shadow-transparent',
  'shadow-current',
  'shadow-none',
  'shadow-xl',
  'shadow-green-500',
  'mt-[-10.2%]',
  'ring',
  'ring-10',
  'ring-red2',
  'ring-offset-4',
  'ring-offset-green5',
  'inset-x-5',
  'translate-y-1/4',
  '-translate-y-1/2',
  'preserve-3d',
  'preserve-flat',
  'text-opacity-[13.3333333%]',
  'via-current',
  'via-green-500',
  'via-transparent',
  'list-none',
  'list-disc',
  'list-outside',
  'list-none-inside',
  'image-render-pixel',
  'decoration-slice',
  'appearance-none',
  'caret-op-90',
  'caret-red',
  'space-x-2',
  'space-y-4',
  '-space-x-4',
  'space-x-reverse',
  'next:mt-0',
  'italic',
  'underline',
  'underline-dashed',
  'underline-red-500',
  'underline-op80',
  'underline-auto',
  'underline-5',
  'underline-1rem',
  'underline-offset-auto',
  'underline-offset-4',
  'underline-offset-0.6rem',
  'antialiased',
  'hyphens-none',
  'tab',
  'tab-6',
  'indent',
  'indent-1/2',
  'indent-lg',
  'text-stroke-6',
  'text-stroke-sm',
  'text-stroke-blue-500',
  'text-stroke-op-60',
  'text-shadow',
  'text-shadow-lg',
  'text-shadow-none',
  'text-shadow-$var',
  'write-normal',
  'write-orient-sideways',
  'grid-cols-$1',
  'color-$red',
  'tab-$tabprop',
  'items-$size',
  'object-$fit',
  'bg-$test-variable',
  'bg-blend-$data',
  '!m-$c-m',
  'mt-$height',
  'pt-$title2',
  'space-x-$space',
  'animate-none',
  '!animate-ping',
  'hover:animate-bounce',
  'animate-300',
  'animate-100s',
  'animate-duration-100',
  'animate-duration-100.32',
  'animate-delay--1.37',
  'animate-speed-$speed',
  'animate-name-move',
  'animate-play-paused',
  'animate-normal',
  'animate-play-state-running',
  'animate-mode-none',
  'animate-fill-mode-both',
  'animate-direction-alternate-reverse',
  'animate-count-2.4',
  'animate-iteration-count-2',
  'animate-iteration-count-2-4-infinity',
  'outline-solid',
  'outline-color-red-1',
  'outline-width-10px',
  'outline-inset',
  'outline-110',
  'outline-blue-2',
  'outline-none',
  'placeholder-color-red-1',
  'placeholder-transparent',
  'placeholder-opacity-60',
  'select-none',
  'ws-nowrap',
  'b-2',
  'v-top',
  'v-mid',
  // filters
  'filter',
  'blur',
  'blur-md',
  'blur-4',
  'brightness-0',
  'brightness-60',
  'contrast-125',
  'drop-shadow',
  'drop-shadow-[0_4px_3px_#000]',
  'drop-shadow-none',
  'drop-shadow-md',
  'grayscale',
  'grayscale-90',
  'hue-rotate-0',
  'hue-rotate-360',
  '-hue-rotate-90',
  'invert',
  'invert-90',
  'saturate',
  'saturate-30',
  'sepia',
  'sepia-80',
  // backdrop filters
  'backdrop-filter',
  'backdrop-blur',
  'backdrop-blur-md',
  'backdrop-blur-4',
  'backdrop-brightness-0',
  'backdrop-brightness-60',
  'backdrop-contrast-125',
  'backdrop-grayscale',
  'backdrop-grayscale-90',
  'backdrop-hue-rotate-0',
  'backdrop-hue-rotate-360',
  '-backdrop-hue-rotate-90',
  'backdrop-invert',
  'backdrop-invert-90',
  'backdrop-saturate',
  'backdrop-saturate-30',
  'backdrop-sepia',
  'backdrop-sepia-80',
  'line-clamp-7',
  'line-clamp-100',
  'line-clamp-none',
  // position
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
]

const nonTargets = [
  '--p-2',
  'before:before:m2',
  'hi',
]

const uno = createGenerator({
  presets: [
    presetUno(),
  ],
})

test('targets', async() => {
  const code = targets.join(' ')
  const { css } = await uno.generate(code)
  const { css: css2 } = await uno.generate(code)

  const unmatched = []
  for (const i of targets) {
    if (!css.includes(escapeSelector(i)))
      unmatched.push(i)
  }
  expect(unmatched).toEqual([])
  expect(css).toMatchSnapshot()
  expect(css).toEqual(css2)
})

test('non-targets', async() => {
  const code = nonTargets.join(' ')
  const { css, matched } = await uno.generate(code)

  expect(Array.from(matched)).toEqual([])
  expect(css).toMatch('')
})
