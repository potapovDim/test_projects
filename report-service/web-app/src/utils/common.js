function stringify(arg) {
  return typeof arg !== 'string' ? JSON.stringify(arg) : arg
}

function filterFromUndefinedOrNull(item) {
  if(!item) {
    console.error(
      'Something went wron item is null or undefined \n',
      'Should be some data structure'
    )
    return false
  }
  return true
}

export default {
  stringify,
  filterFromUndefinedOrNull
}