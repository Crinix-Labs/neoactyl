import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect()
  .then(() => console.log('Successfully connected to the database'))
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(-1);
  });

export const db = drizzle(pool, { schema });