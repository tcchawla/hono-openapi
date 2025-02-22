import type { PinoLogger } from 'hono-pino'

import notFound from '@/middlewares/not-found.js'

import onError from '@/middlewares/on-error.js'

import { pinoLogger } from '@/pino-logger.js'
import { OpenAPIHono } from '@hono/zod-openapi'

interface AppBinding {
  Variables: {
    logger: PinoLogger
  }
}

export default function createApp() {
  const app = new OpenAPIHono<AppBinding>()

  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}
