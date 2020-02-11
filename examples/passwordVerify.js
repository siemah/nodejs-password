const { passwordHash, passwordVerify, } = require('nodejs-password');
const { generateSalt, HASH_ALGO, } = require('nodejs-password/lib/helpers');


(async () => {

  const salt = await generateSalt(16, HASH_ALGO.SHA512);
  const password = 'user-key';
  const opts = { length: 12 };

  passwordHash(password, salt, opts)
    .then(hash => {
      passwordVerify(password, hash, salt, opts)
        .then(isMatch => {
          console.log(
            `Password ${password} is match: ${isMatch}`
          )
        })
    })
    .catch(error => console.log(error));

  passwordHash(password, salt, opts)
    .then(hash => {
      passwordVerify('other-password', hash, salt, opts)
        .then(isMatch => {
          console.log(
            `Password other-password not match: ${isMatch}`
          )
        })
    })
    .catch(error => console.log(error));

})();