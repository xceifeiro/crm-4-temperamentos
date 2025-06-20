import postgres from "postgres";
import { config } from "dotenv";

config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não está definida");
}

export const sql = postgres(databaseUrl, { ssl: false }); // Use `ssl: 'require'` se for necessário