import { expandVariantGroup } from '@unocss/core'
import { describe, expect, test } from 'vitest'

describe('variant-group', () => {
  test('basic', async() => {
    expect(expandVariantGroup('')).toEqual('')
    expect(expandVariantGroup('a b c')).toEqual('a b c')
    expect(expandVariantGroup('a:b:c')).toEqual('a:b:c')
    expect(expandVariantGroup('hello a:(b c) c:(a:b d)')).toEqual('hello a:b a:c c:a:b c:d')
  })

  test('hoist-important', async() => {
    expect(expandVariantGroup('b:c:d:(!a z)')).toEqual('!b:c:d:a b:c:d:z')
  })

  test('dash separator', async() => {
    expect(expandVariantGroup('a-(b c) c-(a:b d)')).toEqual('a-b a-c c-a:b c-d')
  })

  test('tilde symbol', () => {
    expect(expandVariantGroup('a-(~ b c)')).toEqual('a a-b a-c')
  })

  test('nested', () => {
    expect(expandVariantGroup('a-(b c-(d e f))')).toEqual('a-b a-c-d a-c-e a-c-f')
  })
})
