import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
    }),
    sveltekit(),
  ],
})
