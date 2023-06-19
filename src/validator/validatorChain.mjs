export class ValidatorChain {
  constructor() {
    this.first = null;
    this.last = null;
    /** @type Array<string> */
    this.validators = [];
  }

  /**
   * @param {import("../../utils/types.mjs").ValidatorClass} validator
   * @returns
   */
  add(validator) {
    if (!this.first) {
      this.first = validator;
      this.last = validator;
    }

    this.validators.push(validator.constructor.name);

    if (this.validators.length > 1) {
      this.last.setNextValidator(validator);
      this.last = validator;
    }

    return this;
  }

  /**
   * @returns {import("../../utils/types.mjs").ValidatorClass}
   */
  startValidation() {
    return this.first;
  }
}
