import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeEmail, resolveWaitlistOutcome } from './waitlist.ts'

test('normalizes email input before evaluating it', () => {
  assert.equal(normalizeEmail('  Person@Company.com '), 'person@company.com')
})

test('rejects invalid email input', () => {
  assert.equal(resolveWaitlistOutcome('not-an-email', new Set()), 'invalid')
})

test('returns success for a new valid email', () => {
  assert.equal(resolveWaitlistOutcome('person@company.com', new Set()), 'success')
})

test('returns duplicate for a previously submitted email', () => {
  assert.equal(resolveWaitlistOutcome('person@company.com', new Set(['person@company.com'])), 'duplicate')
})

test('exposes deterministic duplicate and error states', () => {
  assert.equal(resolveWaitlistOutcome('duplicate@ai-pet.test', new Set()), 'duplicate')
  assert.equal(resolveWaitlistOutcome('error@ai-pet.test', new Set()), 'error')
})
