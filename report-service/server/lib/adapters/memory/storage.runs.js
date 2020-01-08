const {resolve} = require('path')
const {readFile, tryParseJson, writeFile} = require('../../utils')
const {getAvaliableBackUpFiles, restoreDataToStorage, getFreeBackUpFilePathName} = require('./storage.restore')
const {
  BACKUP_PATH = resolve(__dirname, '../../../temp'),
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
  DEMO
} = process.env

const runstStorage = []

if(DEMO) {
  const runs = require('../../../demo/runs.json')
  push(...runs)
}

/**
 *
 * @param {object} runItem
 */
async function setToStorage(runItem) {
  return new Promise((res) => res(runstStorage.push(runItem)))
}

function getStorageData({offset = 0, limit = runstStorage.length} = {}) {
  return new Promise((res) => res([...runstStorage].slice(offset, limit)))
}

async function dropStorage(quantity = runstStorage.length) {
  if(typeof quantity === 'function') {
    // TOT NEED TO FIND SOLUTION
  } else {
    return new Promise((res) => res(runstStorage.splice(0, quantity)))
  }
}

async function push(...items) {
  return new Promise((res) => res(runstStorage.push(...items)))
}

async function tryToRestore() {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
  await restoreDataToStorage(runstStorage, backUpFilesList)
}

async function getAvaliableStorateItems() {
  const itemsWithStorage = [...runstStorage]
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
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
  return new Promise((res) => setTimeout(() => res(runstStorage.length)))
}

async function tryToStore(runWhatWhatShouldBeStored) {
  // temp solution for storage blocker, should not start in case if error
  if(!runWhatWhatShouldBeStored) {
    return
  }
  const runDataWhatShouldBeStored = runstStorage.find(({run}) => run === runWhatWhatShouldBeStored)
  const runsWithoutStored = runstStorage.filter(({run}) => run !== runWhatWhatShouldBeStored)

  await dropStorage()
  await push(...runsWithoutStored)
  if(runDataWhatShouldBeStored) {
    await writeFile(
      await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN), [runDataWhatShouldBeStored]
    )
  }
}

module.exports = {
  tryToRestore,
  setToStorage,
  getStorageData,
  dropStorage,
  getAvaliableStorateItems,
  push,
  count,
  tryToStore,
}
