import { PHOD } from './constants'
import { passwordHash } from './hash'
import { PasswordHashOptionProps } from './typings'
/**
 * check if password match hash value
 * @param password password to check
 * @param hash hashed value to compare in most cases hashed password saved on some storage like DB..
 * @param salt salt used to hash the origin value in hash param
 * @version 1.0.0
 */
export const passwordVerify = (
  password: string,
  hash: string,
  salt: string,
  options: PasswordHashOptionProps = PHOD,
): boolean => passwordHash(password, salt, options) === hash
