import { createRouter } from '@/lib/create-app.js'
import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: 'OpenAPI Index',
      },
    },
  }), (c) => {
    return c.json({ message: 'Hello, OpenAPI!' }, 200)
  })

export default router
