const { passwordHash, } = require('nodejs-password');
const { generateSalt, HASH_ALGO, } = require('nodejs-password/lib/helpers');


(async () => {

  const salt = await generateSalt(16, HASH_ALGO.SHA512);
  const password = 'password';
  passwordHash(password, salt, { length: 12 })
    .then(hash => {
      console.log(
        `hash of ${password} is: ${hash}`
      )
    })
    .catch(error => console.log(error));

  try {
    let hash = await passwordHash(password, salt);
    //
    console.log(`hash of ${password} with async/await is: ${hash}`);

  } catch (error) {
    // handle errors
  }

})();