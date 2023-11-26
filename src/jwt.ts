import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import { environment } from './types/environment';

interface ValidationResult {
  valid: boolean;
  payload?: JwtPayload | null;
  error?: string;
}

export default class SimpleJWT {
  private secret: string;

  constructor() {
    this.secret = environment.JWT_SECRET;
  }

  createJWT(payload: object, options?: SignOptions): string {
    return jwt.sign(payload, this.secret, { expiresIn: '200d', ...options });
  }

  validateJWT(token: string, options?: VerifyOptions): ValidationResult {
    try {
      const decoded = jwt.verify(
        token,
        this.secret,
        options,
      ) as JwtPayload | null;
      return { valid: true, payload: decoded };
    } catch (err: any) {
      return { valid: false, error: err.message };
    }
  }

  getPayload(token: string): ValidationResult {
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      return { valid: true, payload: decoded };
    } catch (err: any) {
      return { valid: false, error: err.message };
    }
  }
}
