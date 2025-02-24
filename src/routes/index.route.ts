import { createRouter } from '@/lib/create-app.js'
import jsonContent from '@/lib/json-content.js'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from '../http-status-codes.js'
import createMessageObjectSchema from '@/schemas/create-message-object.js'

const router = createRouter()
  .openapi(createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Index Route"),
        'Hello, OpenAPI!',
      ),
    },
  }), (c) => {
    return c.json({ message: 'Hello, OpenAPI!' }, HttpStatusCodes.OK)
  })

export default router
