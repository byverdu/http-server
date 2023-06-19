/**
 *
 * @param {"port" | "options" | "options.useCors" | "handler"} propToValidate
 * @param {string} typeofProp
 * @returns {import("../../utils/types.mjs").Validator}
 */
export function validatorErrorMsgGenerator(propToValidate, typeofProp) {
  const typeofExpected = {
    port: 'number',
    options: 'object',
    'options.useCors': 'boolean',
    handler: 'function',
  }[propToValidate];

  return {
    isValid: false,
    errorMsg: `"${propToValidate}" property should be typeof ${typeofExpected} but ${typeofProp} was given`,
  };
}
