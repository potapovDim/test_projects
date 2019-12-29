import url from 'url'


function setLocationHash(val) {
  window.location.hash = val
}

function getLocationHash() {
  const hashUrlPart = window.location.hash.replace(/\#/, '')
  const hashAndQueries = hashUrlPart.split('?')
  return hashAndQueries[0]
}

export default {
  setLocationHash,
  getLocationHash
}