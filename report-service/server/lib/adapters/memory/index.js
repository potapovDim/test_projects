const {getConfig, setConfig} = require('../config')
const {enableAutoStoreStorageItems} = require('./storage.restore')

const testCasesStorage = require('./storage.cases')
const runsStorage = require('./storage.runs')
// TODO temp solution

const restoreWorker = storagesBackUpsInterface()
restoreWorker.enableResore()

function storagesBackUpsInterface() {
  let restoreWorker = null

  function disableWatcher(watcherItem) {
    if(watcherItem) {
      clearInterval(watcherItem)
    }
  }

  function enableResore() {
    restoreWorker = enableAutoStoreStorageItems({testCasesStorage, runsStorage})
  }

  return {
    enableResore,
    disableRestore: () => {
      disableWatcher(restoreWorker)
      restoreWorker = null
    }
  }
}

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
// TODO replaced to storage.cases.js
function dropMemoryStatistics() {
  return runsStorage
    .dropStorage()
    .then(testCasesStorage.dropStorage)
    .catch(console.error)
}

module.exports = {
  getProjects: testCasesStorage.getProjects,
  getStorageData: testCasesStorage.getStorageData,
  setToStorage: testCasesStorage.setToStorage,
  getAvaliableTestCases: testCasesStorage.getAvaliableStorateItems,

  getStorageDataCount: () => console.log('noop'),
  getAvaliableDateRangeForData: () => console.log('noop'),

  getConfig,
  setConfig,

  setToRunsStorage: runsStorage.setToStorage,
  getStorageRunsData: runsStorage.getStorageData,
  getAvaliableRuns: runsStorage.getAvaliableStorateItems,

  dropMemoryStatistics,
  storeCurrentStatistics: () => console.log('noop'),

  storagesBackUpsInterface
}
