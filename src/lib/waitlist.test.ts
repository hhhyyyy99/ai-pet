import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeEmail, resolveWaitlistOutcome } from './waitlist.ts'

test('normalizes email input before evaluating it', () => {
  assert.equal(normalizeEmail('  Person@Example.com '), 'person@example.com')
})

test('rejects invalid email input', () => {
  assert.equal(resolveWaitlistOutcome('not-an-email', new Set()), 'invalid')
})

test('returns success for a new valid email', () => {
  assert.equal(resolveWaitlistOutcome('person@example.com', new Set()), 'success')
})

test('returns duplicate for a previously submitted email', () => {
  assert.equal(resolveWaitlistOutcome('person@example.com', new Set(['person@example.com'])), 'duplicate')
})

test('exposes deterministic duplicate and error demo states', () => {
  assert.equal(resolveWaitlistOutcome('duplicate@demo.test', new Set()), 'duplicate')
  assert.equal(resolveWaitlistOutcome('error@demo.test', new Set()), 'error')
})
