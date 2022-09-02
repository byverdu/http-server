import request from 'supertest'
import { expressApp } from '../app.mjs'

describe('App', () => {
  it('should be defined', () => {
    expect(expressApp).toBeInstanceOf(Function)
  })

  it('should throw Error if no routes are specified', () => {
    expect(() => expressApp()).toThrowError('Either routes is not defined or it is not an Array')
  })

  it('should throw Error if routes do not provide a valid HTTP method', () => {
    expect(() => expressApp({ routes: [{ method: 'posted' }] })).toThrowError('posted is not a valid HTTP method \n Allowed methods are get - delete - post - put - patch')
  })

  it('should throw Error if routes do not provide a function for the handler', () => {
    expect(() => expressApp({ routes: [{ method: 'get', handler: true }] })).toThrowError('handler must be a function. Actual type is "boolean"')
  })

  it('should throw Error if routes do not provide a string for the path', () => {
    expect(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: true }] })).toThrowError('path must be a string. Actual type is "boolean"')
  })

  it('should throw Error if routes provide an empty string for the path', () => {
    expect(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: '' }] })).toThrowError('path can not be an empty string')
  })

  it('should throw Error if routes provide a string for the path that does not start with "/"', () => {
    expect(() => expressApp({ routes: [{ method: 'get', handler: () => {}, path: 'somePath' }] })).toThrowError('path has to start with "/"')
  })

  it('should have a /health route by default', async () => {
    const app = expressApp({ routes: [] })
    const resp = await request(app).get('/health').send()

    expect(resp.ok).toEqual(true)
    expect(resp.type).toEqual('text/html')
    expect(resp.text).toEqual('ok')
  })

  it('should handle 404 requests', async () => {
    const app = expressApp({ routes: [] })
    const resp = await request(app).get('/notFound').send()

    expect(resp.status).toEqual(404)
    expect(resp.type).toEqual('text/html')
    expect(resp.text).toEqual('No handler found for /notFound')
  })

  it('should register all routes passed', async () => {
    const routes = [{ method: 'get', handler: (req, res) => { res.json({ value: 100 }) }, path: '/someRoute' }]
    const server = expressApp({ port: 5000, routes })

    const resp = await request(server).get('/someRoute').send()

    expect(resp.ok).toEqual(true)
    expect(resp.type).toEqual('application/json')
    expect(resp.body).toEqual({ value: 100 })
  })
})
