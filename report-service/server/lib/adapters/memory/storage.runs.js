const runstStorage = []

/**
 *
 * @param {object} runItem
 */
function setToStorage(runItem) {
  // add item should be async
  return new Promise((res) => {
    res(runstStorage.push(runItem))
  })
}

function getStorageData({offset = 0, limit = runstStorage.length} = {}) {
  return new Promise((res) => res([...runstStorage].slice(offset, limit)))
}

function dropStorage() {
  return new Promise((res) => res(runstStorage.splice(0, runstStorage.length)))
}

function push(...items) {
  return new Promise((res) => res(runstStorage.push(...items)))
}

module.exports = {
  setToStorage,
  getStorageData,
  dropStorage,
  push
}