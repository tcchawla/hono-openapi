import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

export const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: 'string',
      received: 'undefined',
      path: ['DATABASE_AUTH_TOKEN'],
      message: 'DATABASE_AUTH_TOKEN is required in production',
    });
  }
  return true;
});

export type env = z.infer<typeof EnvSchema>

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env

try {
  // eslint-disable-next-line no-labels, node/prefer-global/process
  env: env = EnvSchema.parse(process.env)
}
catch (err) {
  console.error('Invalid environment variables')
  console.error(err.flatten().fieldErrors)
  process.exit(1)
}

export default env
