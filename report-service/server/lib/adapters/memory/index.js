const path = require('path')
const {getConfig, setConfig} = require('../config')
const {enableAutoStoreStorageItems} = require('./storage.restore')

// const CONTENT_LENGTH = 150 * 10000

const {
  BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  EXPECTED_CASES_COUNT = 3500,
  RESTORE_CASES_COUNT = 1000,
} = process.env

const testCasesStorage = require('./storage.cases')
const runsStorage = require('./storage.runs')
// TODO temp solution
// const restoreWorker = storagesBackUpsInterface()
// restoreWorker.enableResore()

function storagesBackUpsInterface() {
  let restoreWorker = null

  function disableWatcher(watcherItem) {
    if(watcherItem) {
      clearInterval(watcherItem)
    }
  }

  function enableResore() {
    restoreWorker = enableAutoStoreStorageItems(
      {testCasesStorage, runsStorage},
      testCasesStorage,
      +EXPECTED_CASES_COUNT,
      +RESTORE_CASES_COUNT,
      BACKUP_PATH,
      BACKUP_TEST_FILES_PATTERN
    )
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
