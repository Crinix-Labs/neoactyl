import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  coins: number;
  isAdmin: boolean;
  lastAfkReward?: Date;
  createdAt: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  lastLogin?: Date;
}

export interface Server {
  id: number;
  serverId: string;
  name: string;
  userId: number;
  status: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    isAdmin: boolean;
  };
}