import { passwordHash, passwordVerify } from '../';

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

})
