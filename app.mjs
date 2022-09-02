import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { healthRouter } from './routes/health.mjs'

/**
 *
 * @param {{
 *  routes: Array<{
 *    method: 'get' | 'put' | 'delete' | 'post' | 'patch',
 *    path: string,
 *    handler: function(Request, Response)
 *  }>
 * }}
 * @returns @type Express
 */
function expressApp ({ routes } = {}) {
  if (!routes || !Array.isArray(routes)) {
    throw new Error('Either routes is not defined or it is not an Array')
  }

  const app = express()
  const validHTTPMethods = ['get', 'delete', 'post', 'put', 'patch']

  app.use(cors())
  app.use(morgan('dev'))
  app.use('/health', healthRouter)
  app.use(express.static('public'))

  for (const { path, handler, method } of routes) {
    if (!validHTTPMethods.includes(method)) {
      const errorMsg = `${method} is not a valid HTTP method \n Allowed methods are ${validHTTPMethods.join(' - ')}`
      throw new Error(errorMsg)
    }

    if (typeof handler !== 'function') {
      throw new Error(`handler must be a function. Actual type is "${typeof handler}"`)
    }

    if (typeof path !== 'string') {
      throw new Error(`path must be a string. Actual type is "${typeof path}"`)
    } else if (path.length === 0) {
      throw new Error('path can not be an empty string')
    } else if (!path.startsWith('/')) {
      throw new Error('path has to start with "/"')
    }

    // Register all the handlers
    app[method](path, handler)
  }

  app.use((req, res) => {
    res.status(404).send(`No handler found for ${req.url}`)
  })

  return app
}

export { expressApp }
