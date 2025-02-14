import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/config';
import { CustomError } from '../middleware/errorHandler';
import { validateEmail, generateResetToken } from '../utils/auth';
import { Op } from 'sequelize';


export class AuthService {
  async registerUser(username: string, email: string, password: string) {
    if (!validateEmail(email)) {
      throw new CustomError('Invalid email format', 400);
    }

    if (password.length < 8) {
      throw new CustomError('Password must be at least 8 characters long', 400);
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      throw new CustomError('Username or email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      coins: 0,
      isAdmin: false,
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError('Invalid credentials', 401);
    }

    await user.update({ lastLogin: new Date() });

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { token, user: userWithoutPassword };
  }

  async initiatePasswordReset(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { success: true }; // Don't reveal whether email exists
    }

    const resetToken = generateResetToken();
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    await user.update({
      resetToken: resetTokenHash,
      resetTokenExpiry,
    });

    return { resetToken };
  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const user = await User.findOne({ where: { email } });

    if (!user?.resetToken || !user?.resetTokenExpiry) {
      throw new CustomError('Invalid or expired reset token', 400);
    }

    if (new Date() > user.resetTokenExpiry) {
      throw new CustomError('Reset token has expired', 400);
    }

    const isValidToken = await bcrypt.compare(token, user.resetToken);
    if (!isValidToken) {
      throw new CustomError('Invalid reset token', 400);
    }

    if (newPassword.length < 8) {
      throw new CustomError('Password must be at least 8 characters long', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined,
    });

    return { success: true };
  }
}

export const authService = new AuthService();