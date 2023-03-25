---
title: Uno preset
description: The default preset for UnoCSS (@unocss/preset-uno)
---

# Uno preset

The default preset for UnoCSS: `@unocss/preset-uno`. It's currently equivalent to [`@unocss/preset-wind`](/guide/preset/wind).

::: info
This preset inherits [Wind preset](/guide/preset/wind) and [Mini preset](/guide/preset/mini).
:::

## Installation

::: code-group
  ```bash [pnpm]
  pnpm add -D @unocss/preset-uno
  ```
  ```bash [yarn]
  yarn add -D @unocss/preset-uno
  ```
  ```bash [npm]
  npm install -D @unocss/preset-uno
  ```
:::

```ts
import presetUno from '@unocss/preset-uno'

UnoCSS({
  presets: [
    presetUno(),
  ],
})
```

## Usage

This preset attempts to provide a common superset of the popular utility-first frameworks, including Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.

For example, both `ml-3` (Tailwind), `ms-2` (Bootstrap), `ma4` (Tachyons), and `mt-10px` (Windi CSS) are valid.

```css
.ma4 { margin: 1rem; }
.ml-3 { margin-left: 0.75rem; }
.ms-2 { margin-inline-start: 0.5rem; }
.mt-10px { margin-top: 10px; }
```

For more details about the default preset, you can check out our [playground](https://uno.antfu.me/play/) and try out. Meanwhile, you can also check out [the implementations](https://github.com/unocss/unocss/tree/main/packages).

## License

- MIT License &copy; 2021-PRESENT [Anthony Fu](https://github.com/antfu)