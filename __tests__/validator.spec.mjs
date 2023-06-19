import { jest } from '@jest/globals';
import {
  Validator,
  PortValidator,
  ValidatorChain,
  OptionsValidator,
  RoutesValidator,
  MiddlewareValidator,
  utils,
} from '../src/validator/index.mjs';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('utils', () => {
  describe('validatorErrorMsgGenerator', () => {
    it('should be an instance of function', () => {
      expect(utils.validatorErrorMsgGenerator).toBeInstanceOf(Function);
    });
    it.each([
      [
        'port',
        'undefined',
        '"port" property should be typeof number but undefined was given',
      ],
      [
        'options',
        'undefined',
        '"options" property should be typeof object but undefined was given',
      ],
      [
        'options.useCors',
        'undefined',
        '"options.useCors" property should be typeof boolean but undefined was given',
      ],
      [
        'handler',
        'undefined',
        '"handler" property should be typeof function but undefined was given',
      ],
    ])(
      'utils.validatorErrorMsgGenerator(%s, %s)',
      (propToValidate, typeofProp, errorMsg) => {
        const expected = {
          errorMsg,
          isValid: false,
        };
        expect(
          utils.validatorErrorMsgGenerator(propToValidate, typeofProp)
        ).toMatchObject(expected);
      }
    );
  });
});

describe('Validator', () => {
  it('should be defined', () => {
    expect(Validator).toBeInstanceOf(Function);
  });

  it('should have a "validate" property and be a Function', () => {
    expect(Validator.prototype).toHaveProperty('validate');
    expect(Validator.prototype.validate).toBeInstanceOf(Function);
  });

  it('should have a "setNextValidator" property and be a Function', () => {
    expect(Validator.prototype).toHaveProperty('setNextValidator');
    expect(Validator.prototype.setNextValidator).toBeInstanceOf(Function);
  });

  it('should have a "nextValidator" property initialized to null', () => {
    const validator = new Validator();
    expect(validator).toHaveProperty('nextValidator');
    expect(validator.nextValidator).toEqual(null);
  });
});

describe('ValidatorChain', () => {
  it('should be defined', () => {
    expect(ValidatorChain).toBeInstanceOf(Function);
  });

  it('should have a first, last and validators properties', () => {
    const chain = new ValidatorChain();
    expect(chain.first).toEqual(null);
    expect(chain.last).toEqual(null);
    expect(chain.validators).toEqual([]);
  });

  it('should have a "startValidation" property', () => {
    expect(ValidatorChain.prototype).toHaveProperty('startValidation');
  });

  it('should be able to chain 1 validator', () => {
    jest.spyOn(ValidatorChain.prototype, 'add');
    jest.spyOn(PortValidator.prototype, 'setNextValidator');

    const portValidator = new PortValidator();
    const chain = new ValidatorChain().add(portValidator);

    expect(ValidatorChain.prototype.add).toBeCalledTimes(1);
    expect(ValidatorChain.prototype.add).toBeCalledWith(portValidator);
    expect(PortValidator.prototype.setNextValidator).not.toBeCalled();
    expect(chain.validators).toEqual(['PortValidator']);
    expect(chain.first).toEqual(portValidator);
    expect(chain.last).toEqual(portValidator);
  });

  it('should be able to chain 2 validators', () => {
    jest.spyOn(ValidatorChain.prototype, 'add');
    jest.spyOn(PortValidator.prototype, 'setNextValidator');

    const firstValidator = new PortValidator();
    const secondValidator = new PortValidator();
    const chain = new ValidatorChain().add(firstValidator).add(secondValidator);

    expect(ValidatorChain.prototype.add).toBeCalledTimes(2);
    expect(ValidatorChain.prototype.add).nthCalledWith(1, firstValidator);
    expect(ValidatorChain.prototype.add).nthCalledWith(2, secondValidator);
    expect(chain.validators).toEqual(['PortValidator', 'PortValidator']);
    expect(chain.first).toEqual(firstValidator);
    expect(chain.last).toEqual(secondValidator);
  });

  it('should start a validation', () => {
    jest.spyOn(ValidatorChain.prototype, 'add');
    jest.spyOn(ValidatorChain.prototype, 'startValidation');
    jest.spyOn(PortValidator.prototype, 'validate');

    const options = {
      port: 9000,
    };
    const portValidator = new PortValidator();
    const validation = new ValidatorChain()
      .add(portValidator)
      .startValidation()
      .validate(options);

    expect(ValidatorChain.prototype.add).toBeCalledTimes(1);
    expect(ValidatorChain.prototype.add).toBeCalledWith(portValidator);
    expect(ValidatorChain.prototype.startValidation).toBeCalledTimes(1);
    expect(PortValidator.prototype.validate).toBeCalledTimes(1);
    expect(PortValidator.prototype.validate).toBeCalledWith(options);
    expect(validation).toEqual({ isValid: true });
  });
});

describe('PortValidator', () => {
  it('should extend Validator base class', () => {
    expect(PortValidator.prototype).toBeInstanceOf(Validator);
  });

  it('should validate the port when is wrong', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new PortValidator().validate({ port: '9000' });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(example).toEqual({
      errorMsg: '"port" property should be typeof number but string was given',
      isValid: false,
    });
  });

  it('should call Validator.validate if port is valid', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new PortValidator().validate({ port: 9000 });

    expect(Validator.prototype.validate).toBeCalledTimes(1);
    expect(example).toEqual({
      isValid: true,
    });
  });
});

describe('OptionsValidator', () => {
  it('should extend Validator base class', () => {
    expect(OptionsValidator.prototype).toBeInstanceOf(Validator);
  });

  it('should validate the options when are wrong if they are not an object', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new OptionsValidator().validate({ options: '9000' });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(example).toEqual({
      errorMsg:
        '"options" property should be typeof object but string was given',
      isValid: false,
    });
  });

  it('should validate the wrong options passed', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new OptionsValidator().validate({
      options: { useCors: 'test' },
    });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(example).toEqual({
      errorMsg:
        '"options.useCors" property should be typeof boolean but string was given',
      isValid: false,
    });
  });

  it('should call Validator.validate if the options are valid', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new OptionsValidator().validate({
      options: { useCors: true },
    });

    expect(Validator.prototype.validate).toBeCalledTimes(1);
    expect(example).toEqual({
      isValid: true,
    });
  });
});

describe('RoutesValidator', () => {
  it('should extend Validator base class', () => {
    expect(RoutesValidator.prototype).toBeInstanceOf(Validator);
  });

  it('should validate that "routes" is an array', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new RoutesValidator().validate({ routes: '9000' });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(example).toEqual({
      errorMsg: '"routes" property should be an Array but string was given',
      isValid: false,
    });
  });

  it('should check that all props in a route are valid', () => {
    jest.spyOn(Validator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validateRoutesProps');

    const example = new RoutesValidator().validate({
      routes: [
        {
          methods: 'foo',
        },
      ],
    });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(RoutesValidator.prototype.validateRoutesProps).toBeCalledTimes(1);
    expect(RoutesValidator.prototype.validateRoutesProps).toBeCalledWith({
      methods: 'foo',
    });
    expect(example).toEqual({
      errorMsg: '"routes" items have invalid props',
      isValid: false,
    });
  });

  it('should check that in a route the "method" is valid', () => {
    jest.spyOn(Validator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validateRouteMethod');

    const example = new RoutesValidator().validate({
      routes: [
        {
          method: true,
          handler: '',
          path: '',
        },
      ],
    });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(RoutesValidator.prototype.validateRouteMethod).toBeCalledTimes(1);
    expect(example).toEqual({
      errorMsg: 'true is not a valid method in a route',
      isValid: false,
    });
  });

  it('should check that in a route the "path" is valid', () => {
    jest.spyOn(Validator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validateRoutePath');

    const example = new RoutesValidator().validate({
      routes: [
        {
          method: 'get',
          handler: '',
          path: true,
        },
      ],
    });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(RoutesValidator.prototype.validateRoutePath).toBeCalledTimes(1);
    expect(example).toEqual({
      errorMsg: '"path" in a route must start with "/"',
      isValid: false,
    });
  });

  it('should check that in a route the "handler" is valid', () => {
    jest.spyOn(Validator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validateRoutePath');

    const example = new RoutesValidator().validate({
      routes: [
        {
          method: 'get',
          handler: '',
          path: '/test',
        },
      ],
    });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(RoutesValidator.prototype.validateRoutePath).toBeCalledTimes(1);
    expect(example).toEqual({
      errorMsg:
        '"handler" property should be typeof function but string was given',
      isValid: false,
    });
  });

  it('should call Validator.validate if routes are valid', () => {
    jest.spyOn(Validator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validateRoutePath');

    const example = new RoutesValidator().validate({
      routes: [
        {
          method: 'get',
          handler: () => {},
          path: '/test',
        },
      ],
    });

    expect(Validator.prototype.validate).toBeCalledTimes(1);
    expect(RoutesValidator.prototype.validateRoutePath).toBeCalledTimes(1);
    expect(example).toEqual({
      isValid: true,
    });
  });
});

describe('MiddlewareValidator', () => {
  it('should extend Validator base class', () => {
    expect(MiddlewareValidator.prototype).toBeInstanceOf(Validator);
  });

  it('should validate that "middleware" is an array', () => {
    jest.spyOn(Validator.prototype, 'validate');

    const example = new MiddlewareValidator().validate({ middleware: '9000' });

    expect(Validator.prototype.validate).toBeCalledTimes(0);
    expect(example).toEqual({
      errorMsg: '"middleware" property should be an Array but string was given',
      isValid: false,
    });
  });
});
