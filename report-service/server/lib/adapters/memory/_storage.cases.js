const {Readable} = require('stream')
const {tryParseJson} = require('../../utils')

let testCasesStorage = Buffer.from([])

async function _dropStorage() {
  return new Promise((res) => {
    testCasesStorage = Buffer.from('')
    res()
  }).catch((e) => e)
}

async function addNewTestCase(testCaseData) {
  try {
    testCasesStorage = Buffer.concat(testCasesStorage, [testCaseData])
    return {data: 'ok'}
  } catch(error) {
    // eslint-disable-next-line no-console
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

async function removeStorageItems(itemsCountToRemove) {
  return new Promise((res) => {
    const parsedStorage = tryParseJson(testCasesStorage.toString())
    if(Array.isArray(parsedStorage)) {
      const removedItems = parsedStorage.splice(0, itemsCountToRemove)
      // setNewStorage
      testCasesStorage = Buffer.from(JSON.stringify(parsedStorage))

      res(removedItems)
    } else {
      res([])
    }
  }).catch((e) => e)
}

module.exports = {
  addNewTestCase,
  getTestCases,
  removeStorageItems,
  _dropStorage
}
