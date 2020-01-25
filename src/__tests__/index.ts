import { passwordHash } from '../';

describe('passwordHash', () => {
  let password: string, 
      salt: string,
      passwordErrorMessage: string,
      saltErrorMessage: string;

  beforeAll(() => {
    password             = 'password';
    salt                 = 'salt';
    passwordErrorMessage = 'Password is empty';
    saltErrorMessage     = 'Salt is empty';
  });

  test('should handle errors', () => {
    expect.assertions(2);
    expect(passwordHash('', salt)).rejects.toEqual(new Error(passwordErrorMessage));
    expect(passwordHash(password, '')).rejects.toEqual(new Error(saltErrorMessage));
  });

  test('should resolve a string', async () => {
    const hashedPassword = await passwordHash(password, salt, { length: 9});
    expect(typeof hashedPassword).toBe('string');
  });

});