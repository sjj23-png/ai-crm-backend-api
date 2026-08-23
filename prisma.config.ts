import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  // Prisma 7 ke liye engine "classic" set karna zaroori hai
  engine: "classic",
  schema: 'database/prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});