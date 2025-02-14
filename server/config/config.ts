import { readFileSync } from 'fs';
import * as TOML from '@iarna/toml';
import path from 'path';
import { ParsedConfig } from '../types/config';

// Read and parse the TOML config file
const configPath = path.join(process.cwd(), 'config.toml');
const configFile = readFileSync(configPath, 'utf-8');
const tomlConfig = TOML.parse(configFile) as unknown as ParsedConfig;

export const config = {
  port: Number(process.env.PORT) || tomlConfig.server?.port || 5000,
  jwtSecret: process.env.JWT_SECRET || tomlConfig.jwt?.secret || 'your-secret-key',
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID || tomlConfig.discord?.client_id || '',
    clientSecret: process.env.DISCORD_CLIENT_SECRET || tomlConfig.discord?.client_secret || '',
    callbackUrl: process.env.DISCORD_CALLBACK_URL || tomlConfig.discord?.callback_url || '',
  },
  database: {
    url: process.env.DATABASE_URL || tomlConfig.database?.url
  },
  pterodactyl: {
    url: process.env.PTERODACTYL_URL || '',
    apiKey: process.env.PTERODACTYL_API_KEY || ''
  }
};

export type Config = typeof config;