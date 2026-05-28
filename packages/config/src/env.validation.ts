import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV:                  z.enum(["development","production","test"]).default("development"),
  PORT:                      z.coerce.number().default(3000),
  DATABASE_URL:              z.string().url(),
  REDIS_URL:                 z.string().url(),
  KAFKA_BROKERS:             z.string().default("localhost:9092"),
  JWT_SECRET:                z.string().min(16),
  JWT_EXPIRES_IN:            z.string().default("15m"),
  REFRESH_TOKEN_SECRET:      z.string().min(16),
  REFRESH_TOKEN_EXPIRES_IN:  z.string().default("7d"),
  STRIPE_SECRET_KEY:         z.string(),
  STRIPE_WEBHOOK_SECRET:     z.string(),
  OPENAI_API_KEY:            z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
