import test from 'ava'
import { httpServer } from '../server.mjs'

test.before('Server setup', t => {
  t.context.httpServer = httpServer({ routes: [] })
})

test.after('cleanup', t => {
  t.context.httpServer.close()
})

test('should be defined', t => {
  t.is(typeof httpServer, 'function')
})

test('should return an instance of Express Server', t => {
  t.is(t.context.httpServer.constructor.name, 'Server')
})

test('should default port to 3000 if is not specified', t => {
  const port = t.context.httpServer.address().port
  t.is(port, 3000)
})

test('should set the port number', t => {
  const server = httpServer({ port: 6969, routes: [] })
  const port = server.address().port
  t.is(port, 6969)
  server.close()
})
