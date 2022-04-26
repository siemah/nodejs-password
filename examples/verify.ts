import {
  generateSalt,
  HashAlgoProps,
  passwordHash,
  passwordVerify,
} from '../src'
;(async () => {
  const salt = await generateSalt(16, HashAlgoProps.sha256)
  if (salt instanceof Error) {
    return
  }
  const password = 'user-key'
  const opts = { length: 12 }
  const hash = passwordHash(password, salt, opts)
  if (hash instanceof Error) {
    return
  }
  const isMatch = passwordVerify(password, hash, salt, opts)
  console.log(`Password ${password} is match: ${isMatch}`)
})()
