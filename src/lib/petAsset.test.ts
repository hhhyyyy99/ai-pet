import assert from 'node:assert/strict'
import test from 'node:test'
import { MAX_CUSTOM_PET_BYTES, validatePetAsset } from './petAsset.ts'

test('accepts supported custom pet image formats', () => {
  assert.equal(validatePetAsset({ name: 'pet.png', type: 'image/png', size: 1024 }), null)
  assert.equal(validatePetAsset({ name: 'pet.webp', type: 'image/webp', size: 1024 }), null)
  assert.equal(validatePetAsset({ name: 'pet.gif', type: 'image/gif', size: 1024 }), null)
})

test('accepts a supported extension when the browser omits the mime type', () => {
  assert.equal(validatePetAsset({ name: 'pet.GIF', type: '', size: 1024 }), null)
})

test('rejects unsupported formats and oversized assets', () => {
  assert.equal(
    validatePetAsset({ name: 'pet.svg', type: 'image/svg+xml', size: 1024 }),
    '请选择 PNG、WebP 或 GIF 文件。',
  )
  assert.equal(
    validatePetAsset({ name: 'pet.png', type: 'image/png', size: MAX_CUSTOM_PET_BYTES + 1 }),
    '角色文件不能超过 10 MB。',
  )
  assert.equal(
    validatePetAsset({ name: 'pet.png', type: 'text/plain', size: 1024 }),
    '请选择 PNG、WebP 或 GIF 文件。',
  )
  assert.equal(
    validatePetAsset({ name: 'pet.png', type: 'image/png', size: 0 }),
    '角色文件内容为空。',
  )
})
