import { expressApp } from './app.mjs';

/**
 * @preserve
 * @param {{
 *  port: number,
 *  routes: Array<{
 *    method: 'get' | 'put' | 'delete' | 'post' | 'patch',
 *    path: string,
 *    handler: function(Request, Response)
 *  }>
 *  middleware: Array<Function>
 * }}
 *
 * @returns @type Express
 */

function httpServer({ port, routes, middleware = [] } = {}) {
  const PORT = port || 3000;
  const server = expressApp({ routes, middleware });

  return server.listen(PORT, () => {
    console.log(`App running on: ${PORT}`);
  });
}

export { httpServer };
