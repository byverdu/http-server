class Validator {
  nextValidator = null;

  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  isValid(model) {
    if (this.nextValidator) {
      return this.nextValidator.isValid(model);
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
   * @returns {number}
   */
  getPort(model) {
    return model.port;
  }

  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  isValid(model) {
    const port = this.getPort(model);
    const typeofPort = typeof port;

    if (typeofPort !== 'number') {
      return {
        isValid: false,
        errorMsg: `"port" property should be a number but a ${typeofPort} was given`,
      };
    }

    return super.isValid(model);
  }
}

class MsgValidator extends Validator {
  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {string}
   */
  getMsg(model) {
    return model.msg;
  }

  /**
   * @param {import("../../utils/types.mjs").Params} model
   * @returns {import("../../utils/types.mjs").Validator}
   */
  isValid(model) {
    const msg = this.getMsg(model);
    const typeofMsg = typeof msg;

    if (typeofMsg !== 'string') {
      return {
        isValid: false,
        errorMsg: `"msg" property should be a string but a ${typeofMsg} was given`,
      };
    }

    return super.isValid(model);
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

      // return this;
    }

    this.last.setNextValidator(validator);
    this.last = validator;

    console.log(this);

    return this;
  }

  getFirst() {
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
  .getFirst()
  .isValid(options);

console.log(validation);
