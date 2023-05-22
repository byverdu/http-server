import { expressApp } from './app.mjs';

/**
 * @preserve
 * @param {import("../utils/types.mjs").Params}
 *
 * @returns  {import("http").Server}
 */

function httpServer({ port, routes, middleware }) {
  const PORT = port || 3000;
  const server = expressApp({ routes, middleware });

  return server.listen(PORT, () => {
    console.log(`App running on: ${PORT}`);
  });
}

export { httpServer };
