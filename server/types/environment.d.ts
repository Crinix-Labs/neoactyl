declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      JWT_SECRET: string
      PTERODACTYL_API_URL: string
      NODE_ENV: "development" | "production"
    }
  }
}

export {}

