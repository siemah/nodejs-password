# nodejs-password

A library tools help you to hash passwords, based on javascript promises not callback convention like most nodejs modules and functions.

## If You Are Submitting Bugs or Issues

Verify that the node version you are using is a _stable_ version; it has an even major release number. Unstable versions are currently not supported and issues created while using an unstable version will be closed.

If you are on a stable version of node, please provide a sufficient code snippet or log files for installation issues. The code snippet does not require you to include confidential information. However, it must provide enough information such that the problem can be replicable. Issues which are closed without resolution often lack required information for replication.

## Security Issues And Concerns

As should be the case with any security tool, this library should be scrutinized by anyone using it. If you find or suspect an issue with the code, please bring it to my attention and I'll spend some time trying to make sure that this tool is as secure as possible.

## Dependencies

- Development
- Typescript
- Jest for testing

## Install via NPM

```
npm install nodejs-password-lite
```

## Install via YARN

```
yarn add nodejs-password-lite
```

## Usage

```typescript
import { passwordHash, passwordVerify } from 'nodejs-password-lite'
// generating salt it possible via helpers function see salt section below
const salt = 'salt'
const password = 'user-password'
```

### To hash a password:

passwordHash function accept 3 params:

- password to hash
- salt used to hash the password saved in DB
- the last params is an object contain the length proprety(number of characters to extract)

Technique 1 (hash password):

```typescript
// Store hash in your password DB.
try {
  const hash = passwordHash(password, salt)
} catch (error) {
  // handle errors
}
```

#### Generate a salt using helpers functions:

Technique 2 (hash password by generating salt):

```typescript
import { generateSalt } from 'nodejs-password-lite')

// not forget to surround with sync function to use await keywords
try {
  const salt = await generateSalt(16);//
  const hash = passwordHash(password, salt);
  // Store hash in your password DB.
} catch(error) {
  // handle errors
}
```

generateSalt helper function accept 2 params:

- Firsth the number of characters to generate (for more solid salt at least specify 16)
- Second present algorithem to use sha256/sha512(see example below) default value is sha256

```javascript
import { generateSalt, HashAlgoProps } from 'nodejs-password-lite'

// not forget to surround with sync function to use await keywords
try {
  const salt = await generateSalt(16, HashAlgoProps.sha512)
  const hash = passwordHash(password, salt)
  // Store hash in your password DB.
} catch (error) {
  // handle errors
}
```

Note that both techniques achieve the same end-result.

#### To check a password:

```typescript
// Load hash from your password DB.
const samePassword = await passwordVerify(password, hash, salt) // return true
const notSamePassword = passwordVerify(otherPassword, hash, salt) // return false not the same password
```

passwordVerify accept 4 params:

- password to verify
- hashed password (saved earlier in DB or in other storage..)
- salt used to hash the saved password
- the last params is an object contain the length proprety(number of characters to extract)

Note: when use the 3th param of passwordHash then it must use it with passwordVerify too

```typescript
const opts = { length: 16 }
const hash = passwordHash(password, salt, opts)
const samePassword = passwordVerify(password, hash, salt, opts) // return true
```

## A Note on Rounds

A note about the cost. When you are hashing your data the module will go through a series of rounds to give you a secure hash. The value you submit there is not just the number of rounds that the module will go through to hash your data. The module will use the value you enter and go through `2^rounds` iterations of processing.

## Testing

If you create a pull request, tests better pass :)

```
npm install
npm test


yarn
yarn test
```
