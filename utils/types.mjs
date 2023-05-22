/**
 * @typedef {Object} Options
 *
 * @property {boolean} useCors
 */

/**
 * CRUD operations
 * @typedef {'get' | 'put' | 'delete' | 'post' | 'patch'} Operations
 */

/**
 * Route params
 * @typedef {Object} Route
 *
 * @property {Operations} method
 * @property {string} path
 * @property {(req: Express.Request, resp: Express.Response) => void} handler
 */

/**
 * @typedef {Object} Middleware
 *
 * @property {import("express").Request} req
 * @property {import("express").Response} res
 * @property {import("express").NextFunction} next
 */

/**
 * Server and App params
 * @typedef {Object} Params
 *
 * @property {number} [port]
 * @property {Array<Middleware>} middleware
 * @property {Options} [options]
 * @property {Array<Route>} routes
 */

export {};
