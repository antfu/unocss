import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/babel',
  ],
  clean: true,
  declaration: true,
  externals: [
    'magic-string',
    '@babel/core',
    '@babel/preset-typescript',
    '@babel/plugin-syntax-jsx',
  ],
  rollup: {
    emitCJS: true,
  },
})
