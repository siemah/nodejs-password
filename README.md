# nodejs-password

A library tools help you to hash passwords, based on javascrypt promises not callback convention like most nodejs modules and functions.

## If You Are Submitting Bugs or Issues

Verify that the node version you are using is a _stable_ version; it has an even major release number. Unstable versions are currently not supported and issues created while using an unstable version will be closed.

If you are on a stable version of node, please provide a sufficient code snippet or log files for installation issues. The code snippet does not require you to include confidential information. However, it must provide enough information such that the problem can be replicable. Issues which are closed without resolution often lack required information for replication.

## Security Issues And Concerns

As should be the case with any security tool, this library should be scrutinized by anyone using it. If you find or suspect an issue with the code, please bring it to my attention and I'll spend some time trying to make sure that this tool is as secure as possible.

## Dependencies

* Development
* Typescript 
* Jest for testing
* Babel

## Install via NPM

```
npm install nodejs-password
```

## Install via YARN

```
yarn add nodejs-password
```

## Usage

```javascript
const { passwordHash, passwordVerify, } = require('nodejs-password');
// generating salt it possible via helpers function see salt section below
const salt = 'salt';
const password = 'user-password';
```

### To hash a password:

passwordHash function accept 3 params:
- password to hash
- salt used to hash the password saved in DB
- the last params is an object contain the length proprety(number of characters to extract)

Technique 1 (hash password):

```javascript
passwordHash(password, salt)
    .then(hash => {
      // Store hash in your password DB.
    })
    .catch(error => console.log(error));
```

Technique 2 (password hashing using async/await):

```javascript
try {
  let hash = await passwordHash(password, salt);
  // Store hash in your password DB.
} catch (error) {
  // handle errors
}
```

#### Generate a salt using helpers functions:

Technique 3 (hash password by generating salt):

```javascript
const { generateSalt } = require('nodejs-password/lib/helpers');

// not forget to surround with sync function to use await keywords
try {
  const salt = await generateSalt(16);//
  const hash = await passwordHash(password, salt);
  // Store hash in your password DB.
} catch(error) {
  // handle errors
}
```

generateSalt helper function accept 2 params:
- Firsth the number of characters to generate (for more solid salt at least specify 16)
- Second present algorithem to use sha256/sha512(see example below) default value is sha256

```javascript
const { generateSalt, HASH_ALGO } = require('nodejs-password/lib/helpers');

// not forget to surround with sync function to use await keywords
try {
  const salt = await generateSalt(16, HASH_ALGO.SHA512);
  const hash = await passwordHash(password, salt);
  // Store hash in your password DB.
} catch(error) {
  // handle errors
}
```

Note that both techniques achieve the same end-result.

#### To check a password:

```javascript
// Load hash from your password DB.
const samePassword = await passwordVerify(password, hash, salt);// return true
const notSamePassword = await passwordVerify(otherPassword, hash, salt);// return false not the same password
```
passwordVerify accept 4 params:
- password to verify
- hashed password (saved earlier in DB or in other storage..)
- salt used to hash the saved password
- the last params is an object contain the length proprety(number of characters to extract)

Note: when use the 3th param of passwordHash then it must use it with passwordVerify too
```javascript
const opts = { length: 16, };
const hash = await passwordHash(password, salt, opts);
const samePassword = await passwordVerify(password, hash, salt, opts);// return true
```

### Hashing password without salt(generated internaly)

In this case nodejs-password package generate salt internaly and the same for both functions password_hash and password_verify, otherwise, nodejs-password package handle the part of salt 

```javascript
const { password_hash, } = require('nodejs-password');
// your are not need salt
const password = 'user-password';
password_hash(password)
  .then(hash => {
      // Store hash in your password DB.
    })
    .catch(error => console.log(error));
```
password_hash accept 2 param:
- password[required]: data to hash
- options[optional]: an object of length and algo props where
  - options.length: is the length of bytes to use for hashing
  - options.algo: is cryptographic hash functions where one of HASH_ALGO.SHA256 or HASH_ALGO.SHA512

Note: password_hash is different from passwordHash

### Checking match without salt

To verify if the password match the hashed value without salt(because it handled internaly) use password_verify(see below):

```javascript
const { password_verify, } = require('nodejs-password');

password_verify(password, hash)
  .then(isMatch => {
      // see if password match or not
    })
    .catch(error => console.log(error));
```
password_hash accept 2 param:
- password[required]: password to check if match or not
- hash[required]: hashed value to compare with
- options[optional]: an object of length and algo props where
  - options.length: is the length of bytes to use for hashing
  - options.algo: is cryptographic hash functions where one of HASH_ALGO.SHA256 or HASH_ALGO.SHA512

Note: password_verify is different from passwordVerify.
If you pass options params to password_hash it must pass to password_verify to work correctly.
HASH_ALGO imported from helpers.

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


## Contributors

* [Siemah][siemah]
