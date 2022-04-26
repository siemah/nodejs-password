import { scryptSync } from 'crypto'
import { PHOD } from './constants'
import { PasswordHashOptionProps } from './typings'
/**
 * Hash a password
 * @param password
 * @param salt
 * @param options
 * @version 1.0.0
 */
export const passwordHash = (
  password: string,
  salt: string,
  options: PasswordHashOptionProps = PHOD,
): string | Error => {
  const type: BufferEncoding = 'base64'
  if (password.length < 1) {
    return new Error(`Password is empty`)
  }
  if (salt.length < 1) {
    return new Error(`Salt is empty`)
  }
  if (options.length < 1) {
    return new Error(`Length must be greater than 0`)
  }
  return (
    scryptSync(password, salt, options.length)
      ?.toString(type)
      ?.substring(0, options.length) || new Error(`Error hashing password`)
  )
}
