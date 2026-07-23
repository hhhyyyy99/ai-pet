export type WaitlistOutcome = 'invalid' | 'success' | 'duplicate' | 'error'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function resolveWaitlistOutcome(email: string, seenEmails: ReadonlySet<string>): WaitlistOutcome {
  const normalized = normalizeEmail(email)
  if (!emailPattern.test(normalized)) return 'invalid'
  if (normalized === 'error@ai-pet.test') return 'error'
  if (normalized === 'duplicate@ai-pet.test' || seenEmails.has(normalized)) return 'duplicate'
  return 'success'
}
