const {Readable} = require('stream')

let testCasesStorage = Buffer.from('')

async function addNewTestCase(testCaseData) {
  try {
    testCasesStorage = Buffer.concat(testCasesStorage, Buffer.from(JSON.stringify(testCaseData)))
    return {data: 'ok'}
  } catch(error) {
    console.error(error)
    return {error}
  }
}

async function getTestCases() {
  const readable = new Readable()
  readable.push(testCasesStorage.toString('utf8'))
  readable.push(null)
  return readable
}

module.exports = {
  addNewTestCase,
  getTestCases
}
