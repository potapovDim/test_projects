const {exec} = require('child_process')
const {DEBUG} = process.env

function executePromisify(cmd = 'echo "Hello world"') {
  return new Promise((res) => {
    const proc = exec(cmd, (err, stdout, stderror) => {
      if(err) {
        // console.log(err)
        // throw err
      }
      // console.log(stdout.toString())
    })

    proc.on('exit', (code) => {
      DEBUG && console.log('EXIT CODE IS: ', code)
    })

    proc.on('close', (code) => {
      DEBUG && console.log('CLOSE CODE IS: ', code)
      code === 0 ? res(null) : res(cmd)
    })
  })
}

module.exports = {
  executePromisify
}