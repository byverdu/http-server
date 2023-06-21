export class Validator {
  /**
   * @type {import("../../utils/types.mjs").ValidatorClass}
   */
  nextValidator = null;

  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    if (this.nextValidator) {
      return this.nextValidator.validate(model);
    }

    return {
      isValid: true,
    };
  }

  /**
   *
   * @param {import("../../utils/types.mjs").ValidatorClass} nextValidator
   */
  setNextValidator(nextValidator) {
    this.nextValidator = nextValidator;
  }
}
