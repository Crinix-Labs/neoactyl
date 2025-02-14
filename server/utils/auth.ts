import crypto from 'crypto';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
