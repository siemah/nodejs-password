import { scrypt, } from 'crypto';

interface PasswordHashOptions {
  length: number;
}
const PHOD = { length: 64 };

/**
 * 
 * @param password 
 * @param salt 
 * @param options 
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