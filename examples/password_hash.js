const { password_hash, } = require('nodejs-password');
const { HASH_ALGO, } = require('nodejs-password/lib/helpers');


(async () => {

  const password = 'password';
  password_hash(password)
    .then(hash => {
      console.log(
        `hash of ${password} is: ${hash}`
      )
    })
    .catch(error => console.log(error));

  try {
    let hash = await password_hash(password, {
      length: 70,
      algo: HASH_ALGO.SHA512
    });
    //
    console.log(`hash of ${password} with second param options using async/await is: ${hash}`);

  } catch (error) {
    // handle errors
  }

})();