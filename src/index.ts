import { scrypt, } from 'crypto';

interface PasswordHashOptions {
  length: number;
}
const PHOD = { length: 64 };

/**
 * hash a password
 * @param password 
 * @param salt 
 * @param options 
 * @version 1.0.0
 */
export const passwordHash = (password: string, salt: string, options: PasswordHashOptions = PHOD): Promise<string | Error> => {
  return new Promise((resolve, reject) => {

    const _type = 'hex';

    if (password.length < 1)
      reject(new Error(`Password is empty`));
    if (salt.length < 1)
      reject(new Error(`Salt is empty`));
    if (options.length < 1)
      reject(new Error(`Length must be greater than 0`));

    scrypt(password, salt, options.length, (err, buffer) => {
      if (err) reject(err);

      let hash: string = buffer.toString(_type);
      hash = hash.substring(0, options.length);

      resolve(hash);
    });

  });
}

/**
 * check if password match hash value
 * @param password password to check
 * @param hash hashed value to compare in most cases hashed password saved on some storage like DB..
 * @param salt salt used to hash the origin value in hash param
 * @version 1.0.0
 */
export const passwordVerify = (password: string, hash: string, salt: string, options: PasswordHashOptions = PHOD): Promise<boolean> => {
  return new Promise(async (resolve) => {
    let _hash = await passwordHash(password, salt, options);
    resolve(_hash === hash);
  })
}