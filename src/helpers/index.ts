import crypto from 'crypto';

export enum HASH_ALGO {
  SHA256 = 'sha256',
  SHA512 = 'sha512',
}

export const generateSalt = (length: number = 1, algo: HASH_ALGO = HASH_ALGO.SHA256): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
    const _type = 'base64';
    try {
      const _hash = crypto.createHash(algo);
      const _data = crypto.randomBytes(length).toString(_type);
      _hash.update(_data);
      resolve(_hash.digest(_type));
    } catch (error) {
      reject(new Error(error))
    }
  });
}