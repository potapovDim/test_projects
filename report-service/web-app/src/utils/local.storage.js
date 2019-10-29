function lsGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch(error) {
    console.error(error)
    return localStorage.getItem(key)
  }
}

function lsSet(key, data) {
  console.log(key, data)
  if(typeof data === 'string') {
    localStorage.setItem(key, data)
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export default {
  lsGet,
  lsSet
}
