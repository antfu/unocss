// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = 'antfu'
export const name = '@unocss/vscode'
export const version = '0.65.4'
export const displayName = 'UnoCSS'
export const description = 'UnoCSS for VS Code'
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey =
  | 'unocss.reload'
  | 'unocss.insert-skip-annotation'

/**
 * Commands map registed by `antfu.@unocss/vscode`
 */
export const commands = {
  /**
   * Reload UnoCSS
   * @value `unocss.reload`
   */
  reload: 'unocss.reload',
  /**
   * Insert `@unocss-skip` for the selection
   * @value `unocss.insert-skip-annotation`
   */
  insertSkipAnnotation: 'unocss.insert-skip-annotation',
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey =
  | 'unocss.disable'
  | 'unocss.languageIds'
  | 'unocss.root'
  | 'unocss.include'
  | 'unocss.exclude'
  | 'unocss.underline'
  | 'unocss.colorPreview'
  | 'unocss.colorPreviewRadius'
  | 'unocss.remToPxPreview'
  | 'unocss.remToPxRatio'
  | 'unocss.selectionStyle'
  | 'unocss.strictAnnotationMatch'
  | 'unocss.autocomplete.matchType'
  | 'unocss.autocomplete.strict'
  | 'unocss.autocomplete.maxItems'

export interface ConfigKeyTypeMap {
  'unocss.disable': boolean
  'unocss.languageIds': (string[] | undefined)
  'unocss.root': (string[] | string | undefined)
  'unocss.include': (string[] | string | undefined)
  'unocss.exclude': (string[] | string | undefined)
  'unocss.underline': boolean
  'unocss.colorPreview': boolean
  'unocss.colorPreviewRadius': string
  'unocss.remToPxPreview': boolean
  'unocss.remToPxRatio': number
  'unocss.selectionStyle': boolean
  'unocss.strictAnnotationMatch': boolean
  'unocss.autocomplete.matchType': ('prefix' | 'fuzzy')
  'unocss.autocomplete.strict': boolean
  'unocss.autocomplete.maxItems': number
}

export interface ConfigShorthandMap {
  disable: 'unocss.disable'
  languageIds: 'unocss.languageIds'
  root: 'unocss.root'
  include: 'unocss.include'
  exclude: 'unocss.exclude'
  underline: 'unocss.underline'
  colorPreview: 'unocss.colorPreview'
  colorPreviewRadius: 'unocss.colorPreviewRadius'
  remToPxPreview: 'unocss.remToPxPreview'
  remToPxRatio: 'unocss.remToPxRatio'
  selectionStyle: 'unocss.selectionStyle'
  strictAnnotationMatch: 'unocss.strictAnnotationMatch'
  autocompleteMatchType: 'unocss.autocomplete.matchType'
  autocompleteStrict: 'unocss.autocomplete.strict'
  autocompleteMaxItems: 'unocss.autocomplete.maxItems'
}

export interface ConfigShorthandTypeMap {
  disable: boolean
  languageIds: (string[] | undefined)
  root: (string[] | string | undefined)
  include: (string[] | string | undefined)
  exclude: (string[] | string | undefined)
  underline: boolean
  colorPreview: boolean
  colorPreviewRadius: string
  remToPxPreview: boolean
  remToPxRatio: number
  selectionStyle: boolean
  strictAnnotationMatch: boolean
  autocompleteMatchType: ('prefix' | 'fuzzy')
  autocompleteStrict: boolean
  autocompleteMaxItems: number
}

export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {
  key: T
  default: ConfigKeyTypeMap[T]
}

/**
 * Configs map registered by `antfu.@unocss/vscode`
 */
export const configs = {
  /**
   * Disable the UnoCSS extension
   * @key `unocss.disable`
   * @default `false`
   * @type `boolean`
   */
  disable: {
    key: 'unocss.disable',
    default: false,
  } as ConfigItem<'unocss.disable'>,
  /**
   *
   * @key `unocss.languageIds`
   * @default `undefined`
   * @type `array`
   */
  languageIds: {
    key: 'unocss.languageIds',
    default: undefined,
  } as ConfigItem<'unocss.languageIds'>,
  /**
   * Project root that contains the UnoCSS configuration file
   * @key `unocss.root`
   * @default `undefined`
   * @type `array,string`
   */
  root: {
    key: 'unocss.root',
    default: undefined,
  } as ConfigItem<'unocss.root'>,
  /**
   * Directory of files to be detected
   * @key `unocss.include`
   * @default `undefined`
   * @type `array,string`
   */
  include: {
    key: 'unocss.include',
    default: undefined,
  } as ConfigItem<'unocss.include'>,
  /**
   * Directory of files not to be detected
   * @key `unocss.exclude`
   * @default `undefined`
   * @type `array,string`
   */
  exclude: {
    key: 'unocss.exclude',
    default: undefined,
  } as ConfigItem<'unocss.exclude'>,
  /**
   * Enable/disable underline decoration for class names
   * @key `unocss.underline`
   * @default `true`
   * @type `boolean`
   */
  underline: {
    key: 'unocss.underline',
    default: true,
  } as ConfigItem<'unocss.underline'>,
  /**
   * Enable/disable color preview decorations
   * @key `unocss.colorPreview`
   * @default `true`
   * @type `boolean`
   */
  colorPreview: {
    key: 'unocss.colorPreview',
    default: true,
  } as ConfigItem<'unocss.colorPreview'>,
  /**
   * Radius for color preview
   * @key `unocss.colorPreviewRadius`
   * @default `"50%"`
   * @type `string`
   */
  colorPreviewRadius: {
    key: 'unocss.colorPreviewRadius',
    default: '50%',
  } as ConfigItem<'unocss.colorPreviewRadius'>,
  /**
   * Enable/disable rem to px preview in hover
   * @key `unocss.remToPxPreview`
   * @default `true`
   * @type `boolean`
   */
  remToPxPreview: {
    key: 'unocss.remToPxPreview',
    default: true,
  } as ConfigItem<'unocss.remToPxPreview'>,
  /**
   * Ratio of rem to px
   * @key `unocss.remToPxRatio`
   * @default `16`
   * @type `number`
   */
  remToPxRatio: {
    key: 'unocss.remToPxRatio',
    default: 16,
  } as ConfigItem<'unocss.remToPxRatio'>,
  /**
   * Enable/disable selection style decorations
   * @key `unocss.selectionStyle`
   * @default `true`
   * @type `boolean`
   */
  selectionStyle: {
    key: 'unocss.selectionStyle',
    default: true,
  } as ConfigItem<'unocss.selectionStyle'>,
  /**
   * Be strict about where to show annotations
   * @key `unocss.strictAnnotationMatch`
   * @default `false`
   * @type `boolean`
   */
  strictAnnotationMatch: {
    key: 'unocss.strictAnnotationMatch',
    default: false,
  } as ConfigItem<'unocss.strictAnnotationMatch'>,
  /**
   * The matching type for autocomplete
   * @key `unocss.autocomplete.matchType`
   * @default `"prefix"`
   * @type `string`
   */
  autocompleteMatchType: {
    key: 'unocss.autocomplete.matchType',
    default: 'prefix',
  } as ConfigItem<'unocss.autocomplete.matchType'>,
  /**
   * Be strict about where to show autocomplete
   * @key `unocss.autocomplete.strict`
   * @default `false`
   * @type `boolean`
   */
  autocompleteStrict: {
    key: 'unocss.autocomplete.strict',
    default: false,
  } as ConfigItem<'unocss.autocomplete.strict'>,
  /**
   * The maximum number of items to show in autocomplete
   * @key `unocss.autocomplete.maxItems`
   * @default `1000`
   * @type `number`
   */
  autocompleteMaxItems: {
    key: 'unocss.autocomplete.maxItems',
    default: 1000,
  } as ConfigItem<'unocss.autocomplete.maxItems'>,
}

export interface ScopedConfigKeyTypeMap {
  'disable': boolean
  'languageIds': (string[] | undefined)
  'root': (string[] | string | undefined)
  'include': (string[] | string | undefined)
  'exclude': (string[] | string | undefined)
  'underline': boolean
  'colorPreview': boolean
  'colorPreviewRadius': string
  'remToPxPreview': boolean
  'remToPxRatio': number
  'selectionStyle': boolean
  'strictAnnotationMatch': boolean
  'autocomplete.matchType': ('prefix' | 'fuzzy')
  'autocomplete.strict': boolean
  'autocomplete.maxItems': number
}

export const scopedConfigs = {
  scope: 'unocss',
  defaults: {
    'disable': false,
    'languageIds': undefined,
    'root': undefined,
    'include': undefined,
    'exclude': undefined,
    'underline': true,
    'colorPreview': true,
    'colorPreviewRadius': '50%',
    'remToPxPreview': true,
    'remToPxRatio': 16,
    'selectionStyle': true,
    'strictAnnotationMatch': false,
    'autocomplete.matchType': 'prefix',
    'autocomplete.strict': false,
    'autocomplete.maxItems': 1000,
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  unocss: {
    disable: boolean
    languageIds: (string[] | undefined)
    root: (string[] | string | undefined)
    include: (string[] | string | undefined)
    exclude: (string[] | string | undefined)
    underline: boolean
    colorPreview: boolean
    colorPreviewRadius: string
    remToPxPreview: boolean
    remToPxRatio: number
    selectionStyle: boolean
    strictAnnotationMatch: boolean
    autocomplete: {
      matchType: ('prefix' | 'fuzzy')
      strict: boolean
      maxItems: number
    }
  }
}

export interface NestedScopedConfigs {
  disable: boolean
  languageIds: (string[] | undefined)
  root: (string[] | string | undefined)
  include: (string[] | string | undefined)
  exclude: (string[] | string | undefined)
  underline: boolean
  colorPreview: boolean
  colorPreviewRadius: string
  remToPxPreview: boolean
  remToPxRatio: number
  selectionStyle: boolean
  strictAnnotationMatch: boolean
  autocomplete: {
    matchType: ('prefix' | 'fuzzy')
    strict: boolean
    maxItems: number
  }
}
