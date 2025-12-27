import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXTAUTH_url: z.string().optional(), // Optional for Vercel
    AUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
