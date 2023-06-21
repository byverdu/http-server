import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { healthRouter } from './routes/health.mjs';

/**
 * @param {import("../utils/types.mjs").Params}
 *
 * @returns {import("express").Express}
 */
function expressApp({ routes, middleware }) {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use('/health', healthRouter);
  app.use(express.static('public'));
  app.use(bodyParser.json());

  for (const { path, handler, method } of routes) {
    // Register all the handlers
    app[method](path, handler);
  }

  app.use((req, res) => {
    res.status(404).send(`No handler found for ${req.url}`);
  });

  for (const handler of middleware) {
    // Register all the middleware
    app.use(handler);
  }

  return app;
}

export { expressApp };
