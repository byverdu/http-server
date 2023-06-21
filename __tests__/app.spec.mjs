import request from 'supertest';
import { jest } from '@jest/globals';
import { expressApp } from '../src/app.mjs';

const mockedMiddleware = jest.fn;

describe('App', () => {
  it('should be defined', () => {
    expect(expressApp).toBeInstanceOf(Function);
  });

  it('should have a /health route by default', async () => {
    const app = expressApp({ middleware: [mockedMiddleware], routes: [] });
    const resp = await request(app).get('/health');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('ok');
  });

  it('should handle 404 requests', async () => {
    const app = expressApp({ middleware: [mockedMiddleware], routes: [] });
    const resp = await request(app).get('/notFound');

    expect(resp.status).toEqual(404);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('No handler found for /notFound');
  });

  it('should register all routes passed', async () => {
    const routes = [
      {
        method: 'get',
        handler: (req, res) => {
          res.json({ value: 100 });
        },
        path: '/someRoute',
      },
    ];
    const server = expressApp({ routes, middleware: [mockedMiddleware] });

    const resp = await request(server).get('/someRoute').send();

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual({ value: 100 });
  });
});
