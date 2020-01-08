// const fs = require('fs')
const path = require('path')
const {getFreeBackUpFilePathName} = require('./_storage.restore')

/**
 *
 * @param {string} dirName
 * @param {string} backUpfileNamePart
 * @returns {number} storedTestCasesCount
 */
async function getStoredTestCasesCount(dirName, backUpfileNamePart) {

  dirName = dirName || path.resolve(__dirname, '../../../temp')
  backUpfileNamePart = backUpfileNamePart || 'tests_backup.json'

  const files = (await getFreeBackUpFilePathName(dirName))
    .filter((filePathName) => filePathName.includes(backUpfileNamePart))

  return files.length * 1000
}

module.exports = {
  getStoredTestCasesCount
}
