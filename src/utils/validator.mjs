class Validator {
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

  setNextValidator(nextValidator) {
    this.nextValidator = nextValidator;
  }
}

class PortValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const typeofPort = typeof model.port;

    if (typeofPort !== 'number') {
      return {
        isValid: false,
        errorMsg: `"port" property should be a number but a ${typeofPort} was given`,
      };
    }

    return super.validate(model);
  }
}

class MsgValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  validate(model) {
    const typeofMsg = typeof model.msg;

    if (typeofMsg !== 'string') {
      return {
        isValid: false,
        errorMsg: `"msg" property should be a string but a ${typeofMsg} was given`,
      };
    }

    return super.validate(model);
  }
}

class ValidatorChain {
  constructor() {
    this.first = null;
    this.last = null;
  }

  add(validator) {
    if (!this.first) {
      this.first = validator;
      this.last = validator;
    }

    this.last.setNextValidator(validator);
    this.last = validator;

    return this;
  }

  startValidation() {
    return this.first;
  }
}

const options = {
  port: 9000,
  msg: 'Boolean',
};

const validation = new ValidatorChain()
  .add(new PortValidator())
  .add(new MsgValidator())
  .startValidation()
  .validate(options);

console.log(validation);
