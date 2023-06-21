import { jest } from '@jest/globals';
import { httpServer } from '../src/server.mjs';
import {
  ValidatorChain,
  PortValidator,
  OptionsValidator,
  RoutesValidator,
  MiddlewareValidator,
} from '../src/validator/index.mjs';
import utils from '../src/utils/index.mjs';

let server;

beforeAll(() => {
  server = httpServer({ routes: [], middleware: [() => {}] });
});

afterAll(done => {
  server.close(done);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Server', () => {
  it('should be defined', () => {
    expect(httpServer).toBeInstanceOf(Function);
  });

  it('should return an instance of Express Server', () => {
    expect(server.constructor.name).toEqual('Server');
  });

  it('should default port to 3000 if is not specified', () => {
    expect(server.address().port).toEqual(3000);
  });

  it('should set the port number', () => {
    const server = httpServer({
      port: 6969,
      routes: [],
      middleware: [() => {}],
    });

    expect(server.address().port).toEqual(6969);
    server.close();
  });

  it('should validate the options by calling all the Validators', () => {
    jest.spyOn(ValidatorChain.prototype, 'startValidation');
    jest.spyOn(PortValidator.prototype, 'validate');
    jest.spyOn(OptionsValidator.prototype, 'validate');
    jest.spyOn(RoutesValidator.prototype, 'validate');
    jest.spyOn(MiddlewareValidator.prototype, 'validate');

    const server = httpServer({
      port: 6969,
      routes: [],
      middleware: [() => {}],
    });

    expect(ValidatorChain.prototype.startValidation).toBeCalledTimes(1);
    expect(PortValidator.prototype.validate).toBeCalledTimes(1);
    expect(OptionsValidator.prototype.validate).toBeCalledTimes(1);
    expect(RoutesValidator.prototype.validate).toBeCalledTimes(1);
    expect(MiddlewareValidator.prototype.validate).toBeCalledTimes(1);

    server.close();
  });

  it('should stop the app if the Validator fails', () => {
    jest.spyOn(console, 'error');
    jest.spyOn(process, 'exit').mockImplementation(error => error);

    process.env.NODE = 'dev';

    const server = httpServer({
      port: '6969',
      routes: [],
      middleware: [() => {}],
    });

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(
      '"port" property should be typeof number but string was given'
    );
    expect(process.exit).toBeCalledTimes(1);
    expect(process.exit).toBeCalledWith(1);

    server.close();
  });

  it('should call msgBuilder if the Validator is successful', () => {
    jest.spyOn(utils, 'msgBuilder');

    const appParams = {
      port: 6969,
      routes: [],
      middleware: [() => {}],
    };
    const server = httpServer(appParams);

    expect(utils.msgBuilder).toBeCalledTimes(1);
    expect(utils.msgBuilder).toBeCalledWith({
      ...appParams,
      options: { useCors: true },
    });

    server.close();
  });
});
