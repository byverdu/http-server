import { httpServer } from '../server.mjs'

let server

beforeAll(() => {
  server = httpServer({ routes: [], middleware: [() => {}] })
})

afterAll(() => {
  server.close()
})

describe('Server', () => {
  it('should be defined', () => {
    expect(httpServer).toBeInstanceOf(Function)
  })

  it('should return an instance of Express Server', () => {
    expect(server.constructor.name).toEqual('Server')
  })

  it('should default port to 3000 if is not specified', () => {
    expect(server.address().port).toEqual(3000)
  })

  it('should set the port number', () => {
    const server = httpServer({ port: 6969, routes: [], middleware: [() => {}] })

    expect(server.address().port).toEqual(6969)
    server.close()
  })
})
