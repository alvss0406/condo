const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateToken(): string {
  let token = 'rc2_';
  for (let i = 0; i < 32; i++) {
    token += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return token;
}
