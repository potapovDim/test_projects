const fs = require('fs')
const path = require('path')
const {readFile, tryParseJson} = require('../../utils')

const {
  BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
} = process.env

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
 *
 * @param {string} dirName
 * @returns {array} filesArray
 * @example filesArray
 * [
 *  'a.js', 'b.js', 'readme.md'
 * ]
 */
function getFilesList(dirName) {
  return new Promise(function(res, rej) {
    fs.readdir(dirName, function(err, files) {
      if(err) {rej(err)}
      else {res(files)}
    })
  })
}

/**
 *
 * @param {string} itemPath
 * @returns {fs.stat object}nodeStatsObject
 */
function getStats(itemPath) {
  return new Promise(function(res, rej) {
    fs.stat(itemPath, function(err, stats) {
      if(err) {rej(err)}
      else {res(stats)}
    })
  }).catch((e) => e)
}

/**
 *
 * @param {string} dirName
 * @param {array} filesList
 */
async function getFilesWithSubDirs(dirName, filesList = []) {

  if(dirName.match(/node_modules$/ig)) {
    // eslint-disable-next-line no-console
    console.log('It is a bad idea read "node_modules" directory')
    return []
  }

  const files = await getFilesList(dirName)

  for(let file of files) {
    const resolvedPath = path.resolve(dirName, file)
    const fileStat = await getStats(resolvedPath)
    if(fileStat.isDirectory()) {
      filesList.push(...(await getFilesWithSubDirs(resolvedPath, [])))
    } else {
      filesList.push(resolvedPath)
    }
  }
  return filesList
}


/**
 * @returns {array} filesList
 */
async function getAvaliableBackUpFiles(backUpDir, backUpFilePattern) {

  const backUpFileName = (await getFilesWithSubDirs(backUpDir))
    .filter((filePath) => filePath.includes(backUpFilePattern))

  return backUpFileName
}


async function tryToRestoreStorageFromBackups(storage) {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
  await restoreDataToStorage(storage, backUpFilesList)
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


async function tryToRestorerunsStorageFromBackups(runsStorage) {
  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
  await restoreDataToStorage(runsStorage, backUpFilesList)
}

module.exports = {
  getAvaliableBackUpFiles,
  getFilesWithSubDirs,
  getFreeBackUpFilePathName,
  tryToRestoreStorageFromBackups,
  tryToRestorerunsStorageFromBackups
}
