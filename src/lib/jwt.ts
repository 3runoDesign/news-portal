import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(username: string) {
  return jwt.sign({ username }, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret) as { username: string };
  } catch (error) {
    return null;
  }
}
