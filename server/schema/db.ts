import { pgTable, serial, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  email: varchar('email', { length: 120 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  coins: integer('coins').notNull().default(0),
  isAdmin: boolean('is_admin').notNull().default(false),
  lastAfkReward: timestamp('last_afk_reward'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  resetToken: varchar('reset_token', { length: 256 }),
  resetTokenExpiry: timestamp('reset_token_expiry'),
  lastLogin: timestamp('last_login')
});

// Servers table
export const servers = pgTable('servers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  pterodactylId: varchar('pterodactyl_id', { length: 128 }).unique(),
  status: varchar('status', { length: 32 }).notNull().default('pending'),
  renewalDate: timestamp('renewal_date'),
  renewalCost: integer('renewal_cost').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  resourceId: integer('resource_id').references(() => resources.id).notNull(),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  cpu: integer('cpu').notNull(), // CPU percentage
  memory: integer('memory').notNull(), // Memory in MB
  disk: integer('disk').notNull(), // Disk in MB
  createdAt: timestamp('created_at').notNull().defaultNow(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
});

export const coupons = pgTable('coupons', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 32 }).notNull().unique(),
  value: integer('value').notNull(),
  type: varchar('type', { length: 16 }).notNull(), // 'coins' or 'resource'
  isUsed: boolean('is_used').notNull().default(false),
  usedBy: integer('used_by').references(() => users.id),
  usedAt: timestamp('used_at'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  amount: integer('amount').notNull(),
  type: varchar('type', { length: 32 }).notNull(), // 'afk_reward', 'linkvertise', 'gift', 'admin', 'renewal'
  description: varchar('description', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: integer('user_id').references(() => users.id).notNull(),
});