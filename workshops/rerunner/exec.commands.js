const {executePromisify} = require('./exec.wrapper')
const {DEBUG} = process.env

let counter = 0
let maxCount = 4

const sleep = (ms = 2500) => new Promise((res) => setTimeout(res, ms))

async function executeCommands(commands, failedCommands = []) {

  async function executeOneCommand() {
    counter++
    const cmd = await executePromisify(commands.splice(0, 1)[0])
    if(cmd) {
      failedCommands.push(cmd)
    }
    counter--
    DEBUG && console.log(counter)
  }

  const watcher = setInterval(async () => {
    if(counter < maxCount) {
      await executeOneCommand()
    }
  }, 500)

  do {
    DEBUG && console.log(commands.length, commands)
    await executeOneCommand()
    if(commands.length || counter) {
      await sleep(500)
    }
    DEBUG && console.log('In do while', counter, commands.length)
  } while(commands.length || counter)
  // remove watcher
  clearInterval(watcher)
  return failedCommands
}

module.exports = {
  executeCommands
}