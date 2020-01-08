const path = require('path')
const fs = require('fs')

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


module.exports = {
  getFilesList,
  getFilesWithSubDirs
}
