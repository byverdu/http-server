import test from 'ava'
import request from 'supertest'
import { expressApp } from '../app.mjs'

test.before('Server setup', t => {
  t.context.expressApp = expressApp({ routes: [] })
})

test('should be defined', t => {
  t.is(typeof expressApp, 'function')
})

test('should throw Error if no routes are specified', t => {
  const error = t.throws(() => expressApp())
  t.is(error.message, 'Either routes is not defined or it is not an Array')
})

test('should throw Error if routes do not provide a valid HTTP method', t => {
  const error = t.throws(() => expressApp({ routes: [{ method: 'posted' }] }))
  t.is(error.message, 'posted is not a valid HTTP method \n Allowed methods are get - delete - post - put - patch')
})

test('should throw Error if routes do not provide a function for the handler', t => {
  const error = t.throws(() => expressApp({ routes: [{ method: 'get', handler: true }] }))
  t.is(error.message, 'handler must be a function. Actual type is "boolean"')
})

test('should throw Error if routes do not provide a string for the path', t => {
  const error = t.throws(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: true }] }))
  t.is(error.message, 'path must be a string. Actual type is "boolean"')
})

test('should throw Error if routes provide an empty string for the path', t => {
  const error = t.throws(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: '' }] }))
  t.is(error.message, 'path can not be an empty string')
})

test('should throw Error if routes provide a string for the path that does not start with "/"', t => {
  const error = t.throws(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: 'someRoute' }] }))
  t.is(error.message, 'path has to start with "/"')
})

test('should have a /health route by default', async t => {
  const resp = await request(t.context.expressApp).get('/health').send()

  t.is(resp.ok, true)
  t.is(resp.type, 'text/html')
  t.is(resp.text, 'ok')
})

test('should handle 404 requests', async t => {
  const resp = await request(t.context.expressApp).get('/notFound').send()

  t.is(resp.type, 'text/html')
  t.is(resp.status, 404)
  t.is(resp.text, 'No handler found for /notFound')
})

test('should register all routes passed', async t => {
  const routes = [{ method: 'get', handler: (req, res) => { res.json({ value: 100 }) }, path: '/someRoute' }]
  const server = expressApp({ port: 5000, routes })

  const resp = await request(server).get('/someRoute').send()

  t.is(resp.ok, true)
  t.is(resp.type, 'application/json')
  t.deepEqual(resp.body, { value: 100 })
})
