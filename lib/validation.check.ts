// `node lib/validation.check.ts`
import assert from 'node:assert/strict'
import { parseEnquiry } from './validation.ts'

const ok = { name: 'Test Person', email: 'Test@Example.com', message: 'I need help with my tax return.', elapsed: 9000 }

const r = parseEnquiry({ ...ok, name: '  Test   Person ', clientType: 'Business', service: 'Financing' })
assert.ok('enquiry' in r && r.enquiry.name === 'Test Person' && r.enquiry.email === 'test@example.com')

// spam: honeypot filled, submitted too fast, or no timing at all
assert.ok('spam' in parseEnquiry({ ...ok, website: 'http://spam.example' }))
assert.ok('spam' in parseEnquiry({ ...ok, elapsed: 300 }))
assert.ok('spam' in parseEnquiry({ name: 'x' }))
assert.ok('spam' in parseEnquiry(null))

const errs = (input: object) => {
  const result = parseEnquiry(input)
  return 'errors' in result ? Object.keys(result.errors) : []
}
assert.deepEqual(errs({ ...ok, name: ' ' }), ['name'])
assert.deepEqual(errs({ ...ok, email: 'not-an-email' }), ['email'])
assert.deepEqual(errs({ ...ok, phone: '123' }), ['phone'])
assert.deepEqual(errs({ ...ok, phone: '+1 (416) 893-4360' }), [])
assert.deepEqual(errs({ ...ok, clientType: 'Robot' }), ['clientType'])
assert.deepEqual(errs({ ...ok, service: '<script>' }), ['service'])
assert.deepEqual(errs({ ...ok, message: 'hi' }), ['message'])
assert.deepEqual(errs({ ...ok, message: 'x'.repeat(3001) }), ['message'])
assert.deepEqual(errs({ ...ok, name: 42, email: [] }), ['name', 'email'])

console.log('validation check passed')
