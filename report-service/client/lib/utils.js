/**
 *
 * @param {any} item
 * @returns boolean
 */
function isObject(item) {
  return Object.prototype.toString.call(item) === '[object Object]'
}

/**
 *
 * @param {any} item
 * @returns string
 */
function stringify(item) {
  return typeof item !== 'string' ? JSON.stringify(item, null, '\t') : item
}

module.exports = {
  isObject,
  stringify
}
