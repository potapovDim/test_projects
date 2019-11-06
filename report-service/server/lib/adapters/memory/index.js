const {getConfig, setConfig} = require('../config')
const {getFreeBackUpFilePathName} = require('./storage.restore')

const storage = []

setInterval(async function() {
  // if cases more than 3500 - remove first 1000 and store them in file
  if(storage.length >= 3500) {
    const {BACKUP_PATH} = process.env
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH)
    const storagePart = storage.splice(0, 1000)
    await require('fs').writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    })
  }
}, 1500)

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
  return {
    count: storage.length,
    config: getConfig(),
    startDate: storage.length ? storage[0].date : null,
    endDate: storage.length ? storage[storage.length - 1].date : null,
    cases: [...storage]
  }
}

module.exports = {
  getStorageData,
  setToStorage,
  getStorageDataCount,
  getStorageBaseInfo,
  getConfig,
  setConfig
}
