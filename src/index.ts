import { scrypt, randomFill, createHash, HexBase64Latin1Encoding, } from 'crypto';
import { generateSalt, HASH_ALGO } from './helpers';

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

    const _type = 'base64';

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

export interface Password_HashOptions extends PasswordHashOptions {
  algo: HASH_ALGO;
}
const P_HOD = {algo: HASH_ALGO.SHA256, length: 64};
/**
 * hash a string passed as param
 * @param password 
 * @returns {Promise<string>} 
 */
export const password_hash = (password: string, options: Password_HashOptions=P_HOD): Promise<string | Error> => {
  return new Promise(async (resolve, reject) => {

    if (typeof password !== 'string')
      reject(new Error('password_hash accept first param to be a string'));

    const _buffer: Buffer = Buffer.alloc(password.length, password);
    const _type: string = 'base64';

    let _salt: string = _buffer.toString(_type);
    let _hash = createHash(options.algo);
    let _result: string;

    _hash.update(_salt);
    _salt = _hash.digest(_type as HexBase64Latin1Encoding);

    scrypt(password, _salt, options.length, (err, buffer) => {
      if (err) reject(err);

      _result = buffer.toString(_type);
      _result = _result.replace(/=*$/, '');
      _result = '$2y$' + _result;

      resolve(_result);
    });

  });
}