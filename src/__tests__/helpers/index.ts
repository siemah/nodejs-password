import { generateSalt } from "../../helpers";

describe('generateSalt', () => {
  
  it('should return a promise', () => {
    const p = generateSalt();

    expect(p).not.toBeUndefined();
    expect(p).not.toBeNull();
  });
  it('generate a salt via returning a promise resolve as string', async () => {
    const p = await generateSalt(0);
    expect(typeof p).toBe('string');
  });
  
});
