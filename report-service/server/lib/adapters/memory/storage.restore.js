const path = require('path')
const {getFilesWithSubDirs} = require('./storage.utils')
const {readFile, tryParseJson} = require('../../utils')

/**
 *
 * @param {string} dirName
 * @param {string} backUpfileNamePart
 * @returns {string} fileNamePath
 * @example fileNamePath
 * '/Usr/adming/10-backup.json'
 */
async function getFreeBackUpFilePathName(dirName, backUpfileNamePart) {

  backUpfileNamePart = backUpfileNamePart || 'tests_backup.json'
  dirName = dirName || path.resolve(__dirname, '../../../temp')

  const files = await getFilesWithSubDirs(dirName)
  return path.resolve(dirName, `${files.length}-${backUpfileNamePart}`)
}

/**
 * @returns {array} filesList
 */
async function getAvaliableBackUpFiles(backUpDir, backUpFilePattern) {
  const backUpFileName = (await getFilesWithSubDirs(backUpDir))
    .filter((filePath) => filePath.includes(backUpFilePattern))

  return backUpFileName
}

async function restoreDataToStorage(storageArr, fileList) {

  if(fileList.length) {
    const lastTwoBackups = fileList.slice(fileList.length - 2, fileList.length)
    for(const file of lastTwoBackups) {
      const backUpFileData = tryParseJson(await readFile(file))
      if(Array.isArray(backUpFileData)) {
        storageArr.push(...backUpFileData)
      }
    }
  }

}

/*
async function tryToRestoreStorageFromBackups(storage) {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
  await restoreDataToStorage(storage, backUpFilesList)
}

async function tryToRestorerunsStorageFromBackups(runsStorage) {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
  await restoreDataToStorage(runsStorage, backUpFilesList)
}
*/

function enableAutoStoreStorageItems({testCasesStorage, runsStorage}, intervalTimer = 1000) {
  const workerInterval = setInterval(function() {
    return testCasesStorage
      .tryToStore()
      .then(runsStorage.tryToStore)
  }, intervalTimer)
  return workerInterval
}

module.exports = {
  getAvaliableBackUpFiles,
  getFilesWithSubDirs,
  getFreeBackUpFilePathName,
  // tryToRestoreStorageFromBackups,
  // tryToRestorerunsStorageFromBackups,
  enableAutoStoreStorageItems,
  restoreDataToStorage
}
