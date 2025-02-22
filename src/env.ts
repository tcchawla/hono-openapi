import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

export const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

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
