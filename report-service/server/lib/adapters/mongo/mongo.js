const {testCase} = require('./models')

async function setToStorage(testCaseData) {
  await testCase(testCaseData).save()
}

async function getStorageData(offset = 0, limit = 0) {
  return new Promise((res) => {

    const testCasesData = []

    testCase.find({}, function(err, testCases) {
      if(err) {
        res(err)
      }
      /**
        *
        * @param {object<{id: string, date: string, build: string, stack: string|object}>} item
        * @returns undefined
        * @example item
        * {
        *  id: 'Test case 1',
        *  date: 1569677669693,
        *  build: 'Some build description',
        *  stack: 'Some stack trace'
        * }
        */
      /* eslint-disable no-unused-vars */
      for(const {_id, ...rest} of testCases) {
        /* eslint-enable no-unused-vars */
        testCasesData.push(rest)
      }
      res(testCasesData.slice(offset, limit || testCasesData.length))
    })
  })
}

module.exports = {
  setToStorage,
  getStorageData
}
