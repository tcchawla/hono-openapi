import createApp from '@/lib/create-app.js'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.debug('This is a debug message')
  throw new Error('Oh no!')
})

export default app
