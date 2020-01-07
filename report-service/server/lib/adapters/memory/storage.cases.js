const {resolve} = require('path')
const {readFile, tryParseJson} = require('../../utils')
const {getAvaliableBackUpFiles, restoreDataToStorage} = require('./storage.restore')
const {
  BACKUP_PATH = resolve(__dirname, '../../../temp'), BACKUP_TEST_FILES_PATTERN = 'tests_backup.json', DEMO
} = process.env

const testCasesStorage = []

if(DEMO) {
  const cases = require('../../../demo/tests.json')
  testCasesStorage.push(...cases)
}

async function setToStorage(testCaseItem) {
  return new Promise((res) => res(testCasesStorage.push(testCaseItem)))
}

async function getStorageData({offset = 0, limit = testCasesStorage.length} = {}) {
  return new Promise((res) => res([...testCasesStorage].slice(offset, limit)))
}

async function dropStorage(quantity = testCasesStorage.length) {
  if(typeof quantity === 'function') {
    // TOT NEED TO FIND SOLUTION
  } else {
    return new Promise((res) => res(testCasesStorage.splice(0, quantity)))
  }
}

async function push(...items) {
  return new Promise((res) => res(testCasesStorage.push(...items)))
}

async function tryToRestore() {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
  await restoreDataToStorage(testCasesStorage, backUpFilesList)
}

async function getAvaliableStorateItems() {
  const itemsWithStorage = [...testCasesStorage]
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
  for(const backUpFile of backUpFilesList) {
    const fileContent = await readFile(backUpFile)
    const parsedFileContent = tryParseJson(fileContent)
    if(Array.isArray(parsedFileContent)) {
      itemsWithStorage.push(...parsedFileContent)
    }
  }
  return itemsWithStorage
}

function count() {
  return testCasesStorage.length
}

function _getStorageContentLength() {
  return JSON.stringify(testCasesStorage).length
}

module.exports = {
  tryToRestore,
  setToStorage,
  getStorageData,
  dropStorage,
  getAvaliableStorateItems,
  push,
  count,
  _getStorageContentLength,
}
