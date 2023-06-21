import { Validator, utils } from './index.mjs';

export class OptionsValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const typeofOptions = typeof model?.options;
    const typeofOptionsUseCors = typeof model?.options?.useCors;

    if (typeofOptions !== 'object') {
      return utils.validatorErrorMsgGenerator('options', typeofOptions);
    }

    if (typeofOptionsUseCors !== 'boolean') {
      return utils.validatorErrorMsgGenerator(
        'options.useCors',
        typeofOptionsUseCors
      );
    }

    return super.validate(model);
  }
}
