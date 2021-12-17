export const presetMiniTargets: string[] = [
  // align
  'v-top',
  'v-mid',

  // behaviors
  'outline-none',
  'outline-solid',
  'outline-color-red-1',
  'outline-width-10px',
  'outline-inset',
  'outline-110',
  'outline-blue-2',
  'outline-none',
  'outline-[var(--red)]',
  'outline-size-[var(--width)]',
  'outline-offset-[var(--offset)]',
  'appearance-none',
  'placeholder-color-red-1',
  'placeholder-transparent',
  'placeholder-opacity-60',
  'will-change-transform',

  // border
  'b-2',
  'border',
  'border-4',
  'border-b',
  'border-x',
  'border-t-2',
  'rounded-[4px]',
  'rounded-1/2',
  'rounded-full',
  'rounded-md',
  'rounded-rb-1/2',
  'rounded-t-sm',
  'rounded-tr',
  'rounded',

  // color, op
  'op-10',
  'opacity-0',
  'opacity-$opa',
  'color-blue',
  'color-blue-400',
  'color-blue-400/10',
  'color-blue/10',
  'color-blue-gray',
  'color-blue-gray-400',
  'color-bluegray',
  'color-bluegray-400',
  'color-blue-gray-400/10',
  'color-blue-gray/10',
  'color-bluegray-400/10',
  'color-bluegray/10',
  'text-black/10',
  'text-rose',
  'text-red-100',
  'text-red-200/10',
  'text-red-300/20',
  'text-red100',
  'text-red2',
  'text-opacity-[13.3333333%]',
  'text-[var(--color)]',
  'text-[#124]',
  'text-[2em]',
  'text-[calc(1em-1px)]',

  // color - bg
  'bg-[#153]/10',
  'bg-[#1533]',
  'bg-[#1533]/10',
  'bg-[rgba(1,2,3,0.5)]',
  'bg-#452233/40',
  'bg-red-100',
  'bg-teal-100/55',
  'bg-teal-200:55',
  'bg-teal-300:[.55]',
  'bg-teal-400/[.55]',
  'bg-teal-500/[55%]',
  'bg-hex-452233/40',
  'bg-opacity-45',

  // color - border
  'border-[#124]',
  'border-[2em]',
  'border-[calc(1em-1px)]',
  'border-black/10',
  'border-blue',
  'border-red-100',
  'border-red-200/10',
  'border-red-300/20',
  'border-red100',
  'border-red2',
  'border-[var(--color)]',
  'border-green-100/20',
  'border-y-red',
  'border-x-[rgb(1,2,3)]/[0.5]',

  // color - ring
  'ring-red2',

  // decoration
  'decoration-none',
  'decoration-transparent',
  'decoration-purple/50',
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

  // flex, gap
  'flex-[hi]',
  'flex',
  'gap-4',
  'gap-x-1',

  // grid
  'grid-cols-$1',
  'grid-cols-[1fr,2fr,100px,min-content]',
  'grid-cols-2',
  'grid-rows-[1fr,2fr,100px,min-content]',
  'grid-rows-3',
  'grid',
  'auto-rows-min',
  'auto-rows-fr',
  'row-auto',
  'row-span-[hi]',
  'row-[span_1/span_2]',
  'auto-cols-auto',
  'auto-rows-auto',
  'col-span-1',
  'row-span-full',
  'row-end-1',
  'row-start-full',
  'auto-flow-cols-dense',
  'grid-cols-minmax-1rem',
  'grid-rows-minmax-100px',

  // layout
  'overflow-auto',
  'overflow-x-scroll',

  // position
  'order-first',
  'top-0',
  'top-$top-height',
  'inset-x-5',
  'z-0',
  'z-1',
  'z-100',
  'box-content',
  'box-border',

  // ring, shadow
  'ring',
  'ring-10',
  'ring-offset-4',
  'ring-offset-green5',
  'shadow',
  'shadow-transparent',
  'shadow-current',
  'shadow-none',
  'shadow-xl',
  'shadow-green-500',

  // size
  'h-auto',
  'h-1',
  'h-21',
  'h-1/4',
  'h-lg',
  'w-auto',
  'w-1',
  'w-21',
  'w-1/4',
  'w-lg',
  'max-h-[1px]',
  'max-w-none',
  'max-w-20',
  'max-w-lg',
  'max-w-full',
  'max-w-$var',
  'max-w-screen-lg',
  'min-h-[1px]',
  'min-w-none',
  'min-w-20',
  'min-w-lg',
  'min-w-full',
  'min-w-$var',
  'min-w-screen-lg',
  'h-$var',
  'h-[calc(1000px-4rem)]',
  'w-[calc(calc(100px*10)-4rem)]',

  // size - ar
  'aspect-ratio-auto',
  'aspect-ratio-3/2',
  'aspect-ratio-0.7',
  'aspect-ratio-$var',
  'aspect-ratio-[auto_16/9]',

  // spacing
  'p-2',
  'p-t-2',
  'p2',
  'pl-10px',
  'pt-2',
  'pt2',
  'pt-$title2',
  'm-[3em]',
  'm-0',
  'm-1/2',
  'm-auto',
  'mt-[-10.2%]',
  'mt-$height',
  'my-auto',

  // static
  'select-none',
  'ws-nowrap',
  'italic',
  'antialiased',

  // svg
  'fill-none',
  'fill-current',
  'fill-green-400',
  'fill-opacity-80',
  'fill-[#123]',
  'fill-[1rem]',
  'stroke-none',
  'stroke-current',
  'stroke-green-400',
  'stroke-opacity-80',
  'stroke-[#123]',
  'stroke-[1rem]',
  'stroke-size-1',
  'stroke-size-1px',
  'stroke-size-[1rem]',

  // transforms
  'transform',
  'transform-gpu',
  'transform-cpu',
  'transform-none',
  'translate-y-1/4',
  'translate-y-px',
  'translate-full',
  'translate-x-full',
  'rotate-1deg',
  'rotate-[var(--spin)]',
  'preserve-3d',
  'preserve-flat',

  // transition
  'transition-none',
  'transition-delay-300',
  'transition-duration-300',
  'transition-property-width',
  'transition-property-all',
  'transition-200',
  'transition',
  'duration-111',

  // transition - timings
  'ease-linear',

  // typography
  'font-mono',
  'text-4xl',
  'text-base',
  'text-lg',
  'leading-2',
  'tracking-wide',
  'tracking-[2/5]',
  'word-spacing-1',
  'word-spacing-wide',
  'word-spacing-2',
  'tab',
  'tab-6',
  'tab-inherit',
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

  // variables
  'bg-$test-variable',
  'border-$color',
  'border-t-$color',
  'border-x-$color',
  'color-$red',
  'items-$size',
  'object-$fit',
  'tab-$tabprop',

  // dark/light
  'dark:not-odd:text-red',
  'dark:text-xl',
  'light:text-sm',

  // variants
  '-rotate-2',
  '-translate-full',
  '-translate-x-full',
  '-translate-y-1/2',
  'active:scale-4',
  'before:translate-y-full',
  'hover:translate-x-3',
  'peer-checked:translate-x-[var(--reveal)]',

  'before:translate-y-full',
  '-rotate-2',
  'active:scale-4',
  '!hover:px-10',
  '!m-$c-m',
  '!p-5px',
  '-gap-y-5',
  '-m-auto',
  '-mb-px',
  '-p-px',
  '-z-1',
  'all:m-auto',
  'at-2xl:m2',
  'at-lg:m2',
  'at-sm:m1',
  'children:m-auto',
  'disabled:op50',
  'first:p-2',
  'group-focus:p-4',
  'group-hover:group-focus:text-center',
  'hover:!p-1',
  'hover:not-first:checked:bg-red/10',
  'hover:p-5',
  'lt-lg:m2',
  'lt-sm:m1',
  'md:!hidden',
  'md:m-1',
  'next:mt-0',
  'not-hover:p-3',
  'peer-checked:bg-blue-500',
  'peer-not-placeholder-shown:text-2xl',
  'sm:m-1',
  'sm:m1',
]
