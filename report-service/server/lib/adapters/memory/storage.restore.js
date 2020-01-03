const fs = require('fs')
const path = require('path')
const {getFilesWithSubDirs} = require('./storage.utils')
const {readFile, tryParseJson} = require('../../utils')

/*
const {
  BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
} = process.env
*/

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


function enableAutoStoreStorageItems(
  {testCasesStorage /*, runsStorage */},
  storage, expectedExidQuantity, restoreCount, backupPath, backupFilePattern, intervalTimer = 1500
) {
  const workerInterval = setInterval(function() {
    if(testCasesStorage.count() >= expectedExidQuantity) {

      return getFreeBackUpFilePathName(backupPath, backupFilePattern)
        .then((backUpFileName) => {
          return storage.dropStorage(+restoreCount).then((storagePart) => {

            return fs.writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {

              if(err) throw err
            })
          })
        })
    }
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
