function isObject(item) {
  return Object.prototype.toString.call(item) === '[object Object]'
}

function stringify(item) {
  typeof item !== 'string' ? JSON.stringify(item, null, '\t') : item
}

module.exports = {
  isObject,
  stringify
}
