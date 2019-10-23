function stringify(arg) {
  return typeof arg !== 'string' ? JSON.stringify(arg) : arg
}

export {
  stringify
}