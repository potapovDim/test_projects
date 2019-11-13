const path = require('path')
const {getConfig, setConfig} = require('../config')
const {getFreeBackUpFilePathName, getFilesWithSubDirs} = require('./storage.restore')
const {readFile, tryParseJson} = require('../../utils')

const storage = []
const storageBuilds = []

/**
 * @returns {array} filesList
 */
async function getAvaliableBackUpFiles() {
  const {
    BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
    BACKUP_FILES_PATTERN = 'backup.json'
  } = process.env

  const backUpFileName = (await getFilesWithSubDirs(BACKUP_PATH))
    .filter((filePath) => filePath.includes(BACKUP_FILES_PATTERN))

  return backUpFileName
}


tryToRestoreStorageFromBackups()
async function tryToRestoreStorageFromBackups() {

  const backUpFilesList = await getAvaliableBackUpFiles()

  if(backUpFilesList.length) {
    const lastTwoBackups = backUpFilesList.slice(backUpFilesList.length - 2, backUpFilesList.length)
    for(const file of lastTwoBackups) {
      const backUpFileData = tryParseJson(await readFile(file))
      if(Array.isArray(backUpFileData)) {
        storage.push(...backUpFileData)
      }
    }
  }
}


async function getAvaliableDateRangeForData() {
  const avaliableDataRange = {
    startDate: null,
    endDate: null
  }
  const backUpFilesList = await getAvaliableBackUpFiles()
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
  // add item should be async
  return new Promise((res) => {
    res(storage.push(item))
  })
}

function setToStorageBuild(item) {
  // add item should be async
  return new Promise((res) => {
    res(storageBuilds.push(item))
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

function getSturageBuildData(offset = 0, limit = storageBuilds.length) {
  return new Promise((res) => res([...storageBuilds].slice(offset, limit)))
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

module.exports = {
  getStorageData,
  setToStorage,

  getStorageDataCount,
  getAvaliableDateRangeForData,

  getConfig,
  setConfig,

  setToStorageBuild,
  getSturageBuildData
}
