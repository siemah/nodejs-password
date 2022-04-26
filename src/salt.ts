import { BinaryToTextEncoding } from 'crypto'
import { HashAlgoProps } from './typings'
export const generateSalt = async (
  length: number = 1,
  algo: HashAlgoProps = HashAlgoProps.sha256,
): Promise<string | Error> => {
  const type: BinaryToTextEncoding = 'base64'
  const crypto = await import('crypto')
  if (length < 1) {
    return new Error(`Length must be greater than 0`)
  }
  try {
    const hash = crypto.createHash(algo)
    const data = crypto.randomBytes(length).toString(type)
    hash.update(data)
    return hash.digest(type)
  } catch (e) {
    return new Error((<Error>e).message)
  }
}
