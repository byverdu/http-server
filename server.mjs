import { expressApp } from './app.mjs'

/**
 *
 * @param {{
 *  port: number,
 *  routes: Array<{
 *    method: 'get' | 'put' | 'delete' | 'post' | 'patch',
 *    path: string,
 *    handler: function(Request, Response)
 *  }>
 * }}
 * @returns @type Express
 */
function httpServer ({ port, routes } = {}) {
  const PORT = port || 3000
  const server = expressApp({ routes })

  return server.listen(PORT, () => {
    console.log(`App running on: ${PORT}`)
  })
}

export { httpServer }
