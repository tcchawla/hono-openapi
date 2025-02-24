import type { AppBinding } from '@/lib/types.js'

import notFound from '@/middlewares/not-found.js'

import onError from '@/middlewares/on-error.js'

import { pinoLogger } from '@/pino-logger.js'
import { OpenAPIHono } from '@hono/zod-openapi'

export function createRouter() {
  return new OpenAPIHono<AppBinding>({
    strict: false,
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}
