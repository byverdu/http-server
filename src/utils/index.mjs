/**
 *
 * @param {import("../../utils/types.mjs").Params} params
 */
function msgBuilder(params) {
  const entries = Object.entries(params);
  let msg = 'Your app is running with the following settings:';

  for (const [key, value] of entries) {
    let stringifiedValue = JSON.stringify(value);

    if (key === 'middleware' && Array.isArray(value)) {
      stringifiedValue = `${value.length} registered`;
    }

    msg += `\n${key.toUpperCase()}: ${stringifiedValue}`;
  }

  return msg;
}

export default {
  msgBuilder,
};
