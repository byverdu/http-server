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
 * @property {(req: import("express").Request, resp:  import("express").Response) => void} handler
 */

/**
 * Validator return Object
 * @typedef {Object} ValidatorClass
 *
 * @property {(param: Params) => Validator} validate
 * @property {(param: ValidatorClass) => void} setNextValidator
 */

/**
 * Returns if model is valid
 * @typedef {Object} Validator
 *
 * @property {boolean} isValid
 * @property {string} [errorMsg]
 */

/**
 * Returns if model is valid
 * @typedef {Object} ValidatorChain
 *
 * @property {boolean} isValid
 * @property {string} [errorMsg]
 */

/**
 * Server and App params
 * @typedef {Object} Params
 *
 * @property {number} [port]
 * @property {Array<(req: import("express").Request, resp: import("express").Response, next: import("express").NextFunction) => void>} [middleware]
 * @property {Options} [options]
 * @property {Array<Route>} [routes]
 */

export {};
