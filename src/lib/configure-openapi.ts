import type { AppOpenAPI } from './types.js'

import packageJson from '../../package.json'

export default function configureOpenApi(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJson.version,
      title: 'Hono OpenAPI',
    },
  })
}
