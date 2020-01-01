const path = require('path')
const {getConfig, setConfig} = require('../config')
const {readFile, tryParseJson} = require('../../utils')
const {
  getFreeBackUpFilePathName,
  getFilesWithSubDirs,
  tryToRestoreStorageFromBackups,
  tryToRestorerunsStorageFromBackups
} = require('./storage.restore')

const {
  BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
  EXPECTED_RUNST_COUNT = 60,
  EXPECTED_CASES_COUNT = 3500,
  RESTORE_RUNST_COUNT = 50,
  RESTORE_CASES_COUNT = 1000
} = process.env


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
 * @example description
 * this interval is using for storing cases from memory
 * to storage backuk, for inMemory approach it is JSON files
 * in pre-defined directory, by default is /temp in root of the project
 *
 */
setInterval(async function() {
  // if cases more than 3500 - remove first 1000 and store them in file
  if(storage.length >= +EXPECTED_CASES_COUNT) {
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
    const storagePart = storage.splice(0, +RESTORE_CASES_COUNT)
    await require('fs').writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    })
  }

  if(runsStorage.length >= +EXPECTED_RUNST_COUNT) {
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
    const storagePart = runsStorage.splice(0, +RESTORE_RUNST_COUNT)
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
  // add item should be async
  return new Promise((res) => {
    res(storage.push(item))
  })
}

function setToRunsStorage(item) {
  // add item should be async
  return new Promise((res) => {
    res(runsStorage.push(item))
  })
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
  return new Promise((res) => res([...storage].slice(offset, limit)))
}

function getStorageRunsData(offset = 0, limit = runsStorage.length) {
  return new Promise((res) => res([...runsStorage].slice(offset, limit)))
}
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
  return new Promise((res) => {
    runsStorage.splice(0, runsStorage.length)
    storage.splice(0, storage.length)
    res(true)
  })
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
  getStorageData,
  setToStorage,

  getStorageDataCount,
  getAvaliableDateRangeForData,

  getConfig,
  setConfig,

  setToRunsStorage,
  getStorageRunsData,

  dropMemoryStatistics,
  storeCurrentStatistics
}
