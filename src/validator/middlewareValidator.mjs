import { Validator } from './index.mjs';

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
  }
}
