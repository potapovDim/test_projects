const {wrapExec} = require('./exec.wrapper')
const {DEBUG} = process.env

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

async function rerunner(commandsArr, rerunCount = 3, threadsCount = 2, stackAnalyzer) {
  let counter = 0

  async function rerunCommands(cmds, failedCommands = []) {
    async function executeOneCommand() {

      // console.log(threadsCount, 'here in execute one command')

      if(counter < threadsCount && cmds.length) {
        counter++
        console.log(counter, 'Counter should be incl')

        const cmd = await wrapExec(cmds.splice(0, 1)[0], stackAnalyzer)
        console.log(cmd)

        if(cmd) {
          failedCommands.push(cmd)
        }
        counter--
        console.log(counter, 'Counter should be removed')
      }
    }

    const watcher = setInterval(executeOneCommand, 1)

    do {
      await executeOneCommand()
      if(cmds.length || counter) {
        await sleep(1)
      }
    } while(cmds.length || counter)

    clearInterval(watcher)

    return failedCommands
  }

  /*

  const failedCommands = await Array.from(Array(rerunCount)).reduce((acc, cur, index) => {
    return acc
      .then((resolvedCommands) => rerunCommands(resolvedCommands))
      .then((results) => {
        console.log(`Execution index is: ${index}`)
        console.log('______________________________________')
        console.log('Failed commands is', results)
        console.log('______________________________________')
        return results
      })
  }, Promise.resolve(commandsArr))
  */

  let failedCommands = [...commandsArr]

  for(let i = 0; i <= rerunCount; i++) {
    failedCommands = await rerunCommands(failedCommands, [])
    console.log(`Execution index is: ${i}`)
    console.log('______________________________________')
    console.log('Failed commands is', failedCommands)
    console.log('______________________________________')
    if(!failedCommands.length) {
      return failedCommands
    }
  }


  return failedCommands
}

module.exports = {
  rerunner
}
