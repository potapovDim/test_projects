const storage = []
/**
 *
 * @param {object<{id: string, date: string, build: string, stack: string|object}>} item
 * @returns undefined
 * @example item
 * {
 *  id: 'Test case 1',
 *  date: 1569677669693,
 *  build: 'Some build description',
 *  stack: 'Some stack trace'
 * }
 */
function setToStorage(item) {
  storage.push(item)
}

/**
 * @returns {array} storage
 * @example storage
 * [
 *   {
 *    id: 'Test case 1',
 *    date: 1569677669693,
 *    build: 'Some build description',
 *    stack: 'Some stack trace'
 *   }
 * ]
 */
function getStorageData(offset = 0, limit = storage.length) {
  return [...storage].slice(offset, limit)
}

function getStorageDataCount() {
  return {count: storage.length}
}

function getStorageBaseInfo() {

  require('fs').writeFileSync('./dataLol.json', JSON.stringify({
    count: storage.length,
    startDate: storage.length ? storage[0].date : null,
    endDate: storage.length ? storage[storage.length - 1].date : null,
    cases: [...storage]
  }))
  return {
    count: storage.length,
    startDate: storage.length ? storage[0].date : null,
    endDate: storage.length ? storage[storage.length - 1].date : null,
    cases: [...storage]
  }
}

module.exports = {
  getStorageData,
  setToStorage,
  getStorageDataCount,
  getStorageBaseInfo
}
