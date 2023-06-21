import utils from '../src/utils/index.mjs';

describe('msgBuilder', () => {
  it('should be defined', () => {
    expect(utils.msgBuilder).toBeInstanceOf(Function);
  });

  it('should return a msg for the props passed', () => {
    const props = {
      port: 4000,
      routes: [{ handler: () => {}, path: '/some', method: 'get' }],
      middleware: [() => {}],
      options: { useCors: true },
    };

    expect(utils.msgBuilder(props)).toEqual(
      'Your app is running with the following settings:\nPORT: 4000\nROUTES: [{"path":"/some","method":"get"}]\nMIDDLEWARE: 1 registered\nOPTIONS: {"useCors":true}'
    );
  });
});
