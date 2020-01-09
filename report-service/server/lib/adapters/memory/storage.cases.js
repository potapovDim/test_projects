const {resolve} = require('path')
const {readFile, tryParseJson, writeFile} = require('../../utils')
const {getAvaliableBackUpFiles, restoreDataToStorage, getFreeBackUpFilePathName} = require('./storage.restore')
const {
  BACKUP_PATH = resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  EXPECTED_CASES_COUNT = 3500,
  DEMO
} = process.env


/**
 * @example
 * {
 *   id: string,
 *   run: any,
 *   date: number,
 *   stackTrace: string,
 *   env?: string, //optional
 *   project?: any, //optional
 * }
 */
const testCasesStorage = []

if(DEMO) {
  const cases = require('../../../demo/tests.json')
  push(...cases)
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

async function count() {
  return new Promise((res) => setTimeout(() => res(testCasesStorage.length)))
}

async function _getStorageContentLength() {
  return new Promise((res) => setTimeout(() => res(JSON.stringify(testCasesStorage).length)))
}

async function tryToStore() {
  if(EXPECTED_CASES_COUNT < await count()) {
    const toBuilds = testCasesStorage
      .sort((a, b) => b.date - a.date)
      .reduce((acc, testCase) => {
        if(acc[testCase.run]) {
          acc[testCase.run].push(testCase)
        } else {
          acc[testCase.run] = [testCase]
        }
        return acc
      }, {})

    // firstItem
    const runNames = Object.keys(toBuilds)
    const casesFromStoreRun = toBuilds[runNames[0]]
    // write file to disk
    await writeFile(await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN), casesFromStoreRun)
    // remove all items from torage
    await dropStorage()
    // set new items scope to storage
    await push(
      ...runNames
        .filter((_, index) => index !== 0)
        .reduce((acc, k) => {
          acc.push(...toBuilds[k])
          return acc
        }, [])
    )
    // return run what shoult be stored
    return runNames[0]
  }
}

async function getProjectList() {
  return new Promise((res) => setTimeout(() => {
    res(testCasesStorage.reduce((acc, {project}) => {
      if(project && acc.includes(project)) {
        acc.push(project)
      }
      return acc
    }, []))
  }))
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
  tryToStore,
  getProjectList
}
