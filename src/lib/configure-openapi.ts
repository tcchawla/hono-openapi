import type { AppOpenAPI } from './types.js'

import { apiReference } from '@scalar/hono-api-reference'
import packageJson from '../../package.json'

export default function configureOpenApi(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJson.version,
      title: 'Hono OpenAPI',
    },
  })

  app.get('/reference', apiReference({
    theme: 'kepler',
    defaultHttpClient: {
      targetKey: 'javascript',
      clientKey: 'Fetch',
    },
    spec: {
      url: '/doc',
    },
  }))
}
