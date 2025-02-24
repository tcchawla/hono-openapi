import createApp from '@/lib/create-app.js'
import configureOpenApi from './lib/configure-openapi.js'

const app = createApp()

configureOpenApi(app)

export default app
