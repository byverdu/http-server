import { Validator, utils } from './index.mjs';

export class PortValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const typeofPort = typeof model.port;

    if (typeofPort !== 'number') {
      return utils.validatorErrorMsgGenerator('port', typeofPort);
    }

    return super.validate(model);
  }
}
