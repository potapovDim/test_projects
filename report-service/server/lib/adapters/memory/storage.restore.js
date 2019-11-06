const fs = require('fs')
const path = require('path')

async function getFreeBackUpFilePathName(dirName, backUpfileNamePart) {

  backUpfileNamePart = backUpfileNamePart || 'backup.json'
  dirName = dirName || path.resolve(__dirname, '../../../temp')

  const files = await getFilesWithSubDirs(dirName)
  return path.resolve(dirName, `${files.length}-${backUpfileNamePart}`)
}

function getFilesList(dirName) {
  return new Promise(function(res, rej) {
    fs.readdir(dirName, function(err, files) {
      if(err) {rej(err)}
      else {res(files)}
    })
  })
}

function getStats(itemPath) {
  return new Promise(function(res, rej) {
    fs.stat(itemPath, function(err, stats) {
      if(err) {rej(err)}
      else {res(stats)}
    })
  })
}

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
  getFilesWithSubDirs,
  getFreeBackUpFilePathName
}
