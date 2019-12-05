const {executeCommands} = require('./exec.commands')
const fs = require('fs')
const path = require('path')

/* commands array
  [
    'node ./procs/proc.1.js',
    'node ./procs/proc.2.js',
    ....
  ]
*/
const commands = getFilesSync('./procs').map(formCommandInFormat)

function formCommandInFormat(filePath) {
  return `node ${filePath}`
}

function getFilesSync(basePath, filesList = []) {
  if(!fs.statSync(basePath).isDirectory()) {
    throw new Error(`${basePath} is not a directory`)
  }
  const items = fs.readdirSync(basePath).map((item) => path.resolve(basePath, item))

  items.forEach((item) => {
    if(fs.statSync(item).isDirectory()) {
      getFilesSync(item, filesList)
    } else {
      filesList.push(item)
    }
  })

  return filesList
}

rerun()
async function rerun() {
  const result = await Array.from(Array(3)).reduce((acc, current, index) => {
    return acc
      .then((cmds) => executeCommands(cmds))
      .then((results) => {
        console.log(`ITERATION NUMBER : ${index} IS DONE`)
        return results
      })
  }, Promise.resolve(commands))

  console.log('COMMON RESULT IS : ', result)
}
