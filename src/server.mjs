import { expressApp } from './app.mjs';
import utils from './utils/index.mjs';
import {
  ValidatorChain,
  PortValidator,
  OptionsValidator,
  RoutesValidator,
  MiddlewareValidator,
} from './validator/index.mjs';

/**
 * @preserve
 * @param {import("../utils/types.mjs").Params}
 *
 * @returns  {import("http").Server}
 */
function httpServer({
  port,
  routes = [],
  middleware = [],
  options = { useCors: true },
} = {}) {
  const PORT = port || 3000;
  const validation = new ValidatorChain()
    .add(new PortValidator())
    .add(new OptionsValidator())
    .add(new RoutesValidator())
    .add(new MiddlewareValidator())
    .startValidation()
    .validate({ port: PORT, routes, middleware, options });

  if (!validation.isValid) {
    console.error(validation.errorMsg);

    process.exit(1);
  }

  const server = expressApp({ routes, middleware, options });
  const successMsg = utils.msgBuilder({
    port: PORT,
    routes,
    middleware,
    options,
  });

  return server.listen(PORT, () => {
    console.log(`\x1b[32m${successMsg}\x1b[0m`);
  });
}

export { httpServer };
