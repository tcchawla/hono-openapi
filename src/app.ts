import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'

import notFound from './middlewares/not-found.js'

import onError from './middlewares/on-error.js'
import { pinoLogger } from './pino-logger.js'

interface AppBinding {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBinding>()

app.use(pinoLogger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.debug('This is a debug message')
  throw new Error('Oh no!')
})

app.notFound(notFound)
app.onError(onError)

export default app
