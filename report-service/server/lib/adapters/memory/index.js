const path = require('path')
const {getConfig, setConfig} = require('../config')
const {readFile, tryParseJson} = require('../../utils')
const {
  getFreeBackUpFilePathName,
  getFilesWithSubDirs,

  tryToRestoreStorageFromBackups,
  tryToRestorerunsStorageFromBackups,

} = require('./_storage.restore')
const {enableAutoStoreStorageItems} = require('./storage.restore')

const {
  BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
  EXPECTED_RUNST_COUNT = 60,
  EXPECTED_CASES_COUNT = 3500,
  RESTORE_RUNST_COUNT = 50,
  RESTORE_CASES_COUNT = 1000
} = process.env




// * new PART
const testCasesStorageNew = require('./storage.cases')
const runsStorageNew = require('./storage.runs')

const restoreWorker = storagesBackUpsInterface()
function storagesBackUpsInterface() {
  let testCaseRestoreWatcher = null
  let runstRestoreWatcher = null

  function disableWatcher(watcherItem) {
    if(watcherItem) {
      clearInterval(watcherItem)
    }
  }

  function enableResoreTestCases() {
    testCaseRestoreWatcher = enableAutoStoreStorageItems(
      testCasesStorageNew,
      +EXPECTED_CASES_COUNT,
      +RESTORE_CASES_COUNT,
      BACKUP_PATH,
      BACKUP_TEST_FILES_PATTERN
    )
  }

  function enableResoreRuns() {
    runstRestoreWatcher = enableAutoStoreStorageItems(
      runsStorageNew,
      +EXPECTED_RUNST_COUNT,
      +RESTORE_RUNST_COUNT,
      BACKUP_PATH,
      BACKUP_RUNS_FILES_PATTERN
    )
  }

  return {
    enableResoreTestCases,
    disableRestoreTestCases: () => disableWatcher(testCaseRestoreWatcher),
    enableResoreRuns,
    disableRestoreRuns: () => disableWatcher(runstRestoreWatcher)
  }
}



const storage = []
const runsStorage = []
/**
 * @example description
 * try to restore data from FS
 *
 */
tryToRestoreStorageFromBackups(storage)
tryToRestorerunsStorageFromBackups(runsStorage)


/**
 * @returns {array} filesList
 */
async function getAvaliableBackUpFiles(backUpDir, backUpFilePattern) {

  const backUpFileName = (await getFilesWithSubDirs(backUpDir))
    .filter((filePath) => filePath.includes(backUpFilePattern))

  return backUpFileName
}


async function getAvaliableDateRangeForData() {

  const avaliableDataRange = {
    startDate: null,
    endDate: null
  }
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)

  if(backUpFilesList.length) {
    // get data from first file
    const backUpFileData = tryParseJson(await readFile(backUpFilesList[0]))
    if(Array.isArray(backUpFileData)) {
      /**
       * @example
       * it is temporary, because test case structure shoul be used from config
       */
      avaliableDataRange.startDate = backUpFileData[0].date
    }
  } else if(storage.length && !backUpFilesList.length) {
    avaliableDataRange.startDate = storage[0].date
    avaliableDataRange.endDate = storage[storage.length - 1].date
  }
  return avaliableDataRange
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

/**
 * @returns countObject
 * @example countObject
 * {
 *  count: 1
 * }
 */
function getStorageDataCount() {
  return {count: storage.length}
}

function dropMemoryStatistics() {
  return runsStorageNew
    .dropStorage()
    .then(testCasesStorageNew.dropStorage)
    .catch(console.error)
}

function storeCurrentStatistics() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {

    const storageBackUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
    const storagePartStorage = storage.splice(0, storage.length)
    await require('fs').writeFile(storageBackUpFileName, JSON.stringify(storagePartStorage), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
        rej(err)
      }
    })

    const runStatisticsFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
    const storagePartRunStatistic = runsStorage.splice(0, runsStorage.length)
    await require('fs').writeFile(runStatisticsFileName, JSON.stringify(storagePartRunStatistic), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
        rej(err)
      }
    })
    res(true)
  })
}

module.exports = {
  getStorageData: testCasesStorageNew.getStorageData,
  setToStorage: testCasesStorageNew.setToStorage,

  getStorageDataCount,
  getAvaliableDateRangeForData,

  getConfig,
  setConfig,

  setToRunsStorage: runsStorageNew.setToStorage,
  getStorageRunsData: runsStorageNew.getStorageData,

  dropMemoryStatistics,
  storeCurrentStatistics
}
