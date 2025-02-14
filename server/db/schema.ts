import { pgTable, serial, text, integer, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';

// Users table with extended fields for coins and resources
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  coins: integer('coins').notNull().default(0),
  cpu: integer('cpu').notNull().default(0),
  memory: integer('memory').notNull().default(0),
  disk: integer('disk').notNull().default(0),
  slots: integer('slots').notNull().default(0),
  isAdmin: boolean('is_admin').notNull().default(false),
  pterodactylId: text('pterodactyl_id'),
  createdAt: timestamp('created_at').defaultNow(),
  lastLogin: timestamp('last_login'),
  queuePosition: integer('queue_position')
});

// Servers table
export const servers = pgTable('servers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  name: text('name').notNull(),
  pterodactylId: text('pterodactyl_id').notNull(),
  memory: integer('memory').notNull(),
  cpu: integer('cpu').notNull(),
  disk: integer('disk').notNull(),
  lastRenewal: timestamp('last_renewal').notNull(),
  nextRenewal: timestamp('next_renewal').notNull(),
  renewalPrice: integer('renewal_price').notNull(),
  suspended: boolean('suspended').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow()
});

// Coupons table
export const coupons = pgTable('coupons', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  coins: integer('coins'),
  cpu: integer('cpu'),
  memory: integer('memory'),
  disk: integer('disk'),
  slots: integer('slots'),
  usesLeft: integer('uses_left'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow()
});

// Store items table
export const storeItems = pgTable('store_items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  cpu: integer('cpu'),
  memory: integer('memory'),
  disk: integer('disk'),
  slots: integer('slots'),
  enabled: boolean('enabled').notNull().default(true)
});

// Payments table
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  amount: decimal('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull(),
  stripePaymentId: text('stripe_payment_id'),
  createdAt: timestamp('created_at').defaultNow()
});

// Discord rewards table
export const discordRewards = pgTable('discord_rewards', {
  id: serial('id').primaryKey(),
  serverId: text('server_id').notNull(),
  serverName: text('server_name').notNull(),
  reward: integer('reward').notNull(),
  enabled: boolean('enabled').notNull().default(true)
});

// User reward claims table
export const rewardClaims = pgTable('reward_claims', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  rewardId: integer('reward_id').notNull(),
  claimedAt: timestamp('claimed_at').defaultNow()
});
