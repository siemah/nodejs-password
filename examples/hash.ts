import { generateSalt, HashAlgoProps, passwordHash } from '../src'
;(async () => {
  const salt = await generateSalt(16, HashAlgoProps.sha256)
  if (salt instanceof Error) {
    return
  }
  const password = 'password'
  const hash = passwordHash(password, salt, { length: 12 })
  console.log(`hash of ${password} is: ${hash}`)
})()
