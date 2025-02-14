export interface ServerConfig {
  port: number;
  cors_origin: string;
}

export interface JwtConfig {
  secret: string;
}

export interface DiscordConfig {
  client_id: string;
  client_secret: string;
  callback_url: string;
}

export interface DatabaseConfig {
  url?: string;
}

export interface PterodactylConfig {
  url: string;
  apiKey: string;
}

export interface ParsedConfig {
  server: ServerConfig;
  jwt: JwtConfig;
  discord: DiscordConfig;
  database?: DatabaseConfig;
}