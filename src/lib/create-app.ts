import type { AppBinding } from '@/lib/types.js'

import notFound from '@/middlewares/not-found.js'

import onError from '@/middlewares/on-error.js'

import { pinoLogger } from '@/pino-logger.js'
import { OpenAPIHono } from '@hono/zod-openapi'

export default function createApp() {
  const app = new OpenAPIHono<AppBinding>({
    strict: false,
  })

  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}
