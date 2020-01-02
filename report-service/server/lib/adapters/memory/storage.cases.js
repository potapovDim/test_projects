const testCasesStorage = []

function setToStorage(testCaseItem) {
  // add item should be async
  return new Promise((res) => {
    res(testCasesStorage.push(testCaseItem))
  })
}

function getStorageData({offset = 0, limit = testCasesStorage.length} = {}) {
  return new Promise((res) => res([...testCasesStorage].slice(offset, limit)))
}

function dropStorage(quantity = runstStorage.length) {
  return new Promise((res) => res(runstStorage.splice(0, quantity)))
}

function push(...items) {
  return new Promise((res) => res(testCasesStorage.push(...items)))
}

module.exports = {
  setToStorage,
  getStorageData,
  dropStorage,
  push
}