function setLocationHash(val) {
  window.location.hash = val
}

function getLocationHash() {
  return window.location.hash.replace(/\#/, '')
}

export default {
  setLocationHash,
  getLocationHash
}