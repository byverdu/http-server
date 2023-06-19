import { Validator, utils } from './index.mjs';

export class RoutesValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Route} route
   * @returns {boolean}
   */
  validateRoutesProps(route) {
    return ['method', 'path', 'handler']
      .map(prop => Object.keys(route).includes(prop))
      .every(Boolean);
  }

  /**
   * @param {import("../../utils/types.mjs").Operations} operation
   * @returns {boolean}
   */
  validateRouteMethod(operation) {
    return ['delete', 'get', 'patch', 'post', 'put'].includes(operation);
  }

  validateRoutePath(path) {
    return `${path}`.startsWith('/');
  }

  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const { routes } = model;
    const typeofRoutes = typeof routes;

    if (!Array.isArray(routes)) {
      return {
        isValid: false,
        errorMsg: `"routes" property should be an Array but ${typeofRoutes} was given`,
      };
    }

    /**
     * @type {import("../../utils/types.mjs").Operations[]}
     */

    for (const route of routes) {
      const hasInvalidProps = !this.validateRoutesProps(route);

      if (hasInvalidProps) {
        return {
          isValid: false,
          errorMsg: '"routes" items have invalid props',
        };
      }

      if (!this.validateRouteMethod(route.method)) {
        return {
          isValid: false,
          errorMsg: `${route.method} is not a valid method in a route`,
        };
      }

      if (!this.validateRoutePath(route.path)) {
        return {
          isValid: false,
          errorMsg: '"path" in a route must start with "/"',
        };
      }

      const typeofHandler = typeof route.handler;
      if (typeofHandler !== 'function') {
        return utils.validatorErrorMsgGenerator('handler', typeofHandler);
      }
    }

    return super.validate(model);
  }
}
