import { Validator, utils } from './index.mjs';

export class MiddlewareValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const { middleware } = model;
    const typeofMiddleware = typeof middleware;

    if (!Array.isArray(middleware)) {
      return {
        isValid: false,
        errorMsg: `"middleware" property should be an Array but ${typeofMiddleware} was given`,
      };
    }

    for (const fn of middleware) {
      const typeofFn = typeof fn;

      if (typeofFn !== 'function') {
        return utils.validatorErrorMsgGenerator('middleware', typeofFn);
      }

      if (fn.length !== 3 && fn.length !== 4) {
        return {
          errorMsg:
            '"middleware" should have 3 args (req, res, next) or 4 args for error (error, req, res, next)',
          isValid: false,
        };
      }
    }

    return super.validate(model);
  }
}
