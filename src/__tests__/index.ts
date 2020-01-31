import { passwordHash, passwordVerify, password_hash, password_verify, } from '../';
import { HASH_ALGO } from '../helpers';

let password: string,
  salt: string,
  passwordErrorMessage: string,
  saltErrorMessage: string;

beforeAll(() => {
  password = 'password';
  salt = 'salt';
  passwordErrorMessage = 'Password is empty';
  saltErrorMessage = 'Salt is empty';
});

describe('passwordHash', () => {

  test('should handle errors', () => {
    expect.assertions(2);
    expect(passwordHash('', salt)).rejects.toEqual(new Error(passwordErrorMessage));
    expect(passwordHash(password, '')).rejects.toEqual(new Error(saltErrorMessage));
  });

  test('should resolve a string', async () => {
    const hashedPassword = await passwordHash(password, salt, { length: 9 });
    expect(typeof hashedPassword).toBe('string');
  });

});

describe('passwordVerify', () => {

  let hash: string;
  beforeAll(async () => {
    hash = await passwordHash(password, salt) as string;
  });

  test('should resolve boolean', async () => {
    const isPasswordMatch = await passwordVerify(password, hash, salt);
    expect(typeof isPasswordMatch).toBe('boolean');
  });

  test('should verify if password match the hashed value or note', async () => {
    let isPasswordMatch = await passwordVerify(password, hash, salt);
    expect(isPasswordMatch).toBeTruthy();

    isPasswordMatch = await passwordVerify('other password', hash, salt);
    expect(isPasswordMatch).toBeFalsy();
  });

  test('accept the 4th params', async () => {
    const opts = { length: 9 };
    try {
      const hashedPassword = await passwordHash(password, salt, opts) as string;
      expect(passwordVerify(password, hashedPassword, salt, opts)).resolves.toBe(true);
      expect(passwordVerify(password, hashedPassword, salt)).resolves.toBe(false);
    } catch (e) { }
  });


});

describe('password_hash', () => {

  test('should work without salt param', () => {
    expect(password_hash(password)).resolves.toBeTruthy();
  });

  test('should resolved hash be of type string', async () => {
    const hash = await password_hash(password);
    expect(typeof hash).toEqual('string');
  });

  test('should work with different options like algo and length', async () => {
    try {
      const hash = await password_hash(password);
      const hashSha512 = await password_hash(password, {
        algo: HASH_ALGO.SHA512,
        length: 70,
      });
      const hashLength = await password_hash(password, {
        algo: HASH_ALGO.SHA256,
        length: 70,
      });

      expect(hash === hashSha512).toBeFalsy();
      expect(hash === hashLength).toBeFalsy();
    } catch (error) { }
  });

});


describe('password_verify', () => {

  let hash: string, isPasswordMatch: boolean;
  beforeAll(async () => {
    try {
      hash = await password_hash(password) as string;
      isPasswordMatch = await password_verify(password, hash);
    } catch (error) { }
  });

  test('should resolve a boolean', async () => {
    expect(typeof isPasswordMatch).toEqual('boolean');
  });

  test('should password match a hash', () => {
    expect(isPasswordMatch).toBeTruthy();
  });

  test('should password not match a hash', async () => {
    let isPasswordMatch = await password_verify('other-password', hash);
    expect(isPasswordMatch).toBe(false);
  });

  test('should verify if password match hash value with options params', async () => {
    const opts = {
      length: 70,
      algo: HASH_ALGO.SHA512,
    }
    const hash = await password_hash(password, opts) as string;
    const isPasswordMatch = await password_verify(password, hash, opts);
    expect(isPasswordMatch).toEqual(true);
  });

  test('should pass the same options value to both password_hash and password_verify', async () => {
    const opts = {
      length: 70,
      algo: HASH_ALGO.SHA512,
    }
    const hash = await password_hash(password, opts) as string;
    const isPasswordMatch = await password_verify(password, hash);
    expect(isPasswordMatch).toEqual(false);
  });

});

