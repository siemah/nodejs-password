import { passwordHash } from '../src/hash'
import { generateSalt } from '../src/salt'
import { passwordVerify } from '../src/verify'
let password = ''
let salt = ''
let passwordErrorMessage = ''
let saltErrorMessage = ''
let saltLengthMessage = ''
beforeAll(() => {
  password = 'password'
  salt = 'salt'
  passwordErrorMessage = 'Password is empty'
  saltErrorMessage = 'Salt is empty'
  saltLengthMessage = 'Length must be greater than 0'
})
describe('passwordHash', () => {
  test('should handle errors', () => {
    expect(passwordHash('', salt)).toEqual(new Error(passwordErrorMessage))
    expect(passwordHash(password, '')).toEqual(new Error(saltErrorMessage))
  })

  test('should typeof string', async () => {
    const hashedPassword = passwordHash(password, salt, { length: 9 })
    expect(typeof hashedPassword).toBe('string')
  })
})
describe('passwordVerify', () => {
  let hash = ''
  beforeAll(async () => {
    hash = passwordHash(password, salt) as string
  })
  test('should typeof boolean', async () => {
    expect(typeof passwordVerify(password, hash, salt)).toBe('boolean')
  })
  test('should verify if password match the hashed value or note', async () => {
    expect(passwordVerify(password, hash, salt)).toBeTruthy()
    expect(passwordVerify('other password', hash, salt)).toBeFalsy()
  })
  test('accept the 4th params', async () => {
    const opts = { length: 9 }
    try {
      const hashedPassword = passwordHash(password, salt, opts) as string
      expect(
        passwordVerify(password, hashedPassword, salt, opts),
      ).resolves.toBe(true)
      expect(passwordVerify(password, hashedPassword, salt)).resolves.toBe(
        false,
      )
    } catch (e) {}
  })
})

describe('salt generator', () => {
  test('should generate salt', async () => {
    expect(typeof (await generateSalt())).toBe('string')
  })
  test('should handle error invalid length', async () => {
    expect(await generateSalt(0)).toEqual(new Error(saltLengthMessage))
  })
})
