const createSetToStorage = (testCase) => async (testCaseData) => {
  await testCase(testCaseData).save()
}

const createGetStorageData = (testCase) => async (offset = 0, limit = 0) => {
  return new Promise((res) => {
    const emptyQueryObject = {}
    const testCasesData = []

    testCase.find(emptyQueryObject, null, {skip: offset}, function(err, testCases) {
      if(err) {
        res(err)
      }
      /**
        * @example item
        * {
        *  id: 'Test case 1',
        *  date: 1569677669693,
        *  build: 'Some build description',
        *  stack: 'Some stack trace'
        * }
        */
      /* eslint-disable no-unused-vars */
      for(const {id, build, date, stack, } of testCases) {
        /* eslint-enable no-unused-vars */
        testCasesData.push({id, build, date, stack})
      }
      res(testCasesData.slice(0, limit || testCasesData.length))
    })
  })
}

module.exports = {
  createSetToStorage,
  createGetStorageData
}
