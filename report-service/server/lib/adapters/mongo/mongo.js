const createSetToStorage = (testCase) => async (testCaseData) => {
  await testCase(testCaseData).save()
}

const createGetStoragCount = (testCase) => async () => {
  return new Promise((res) => {
    const emptyQueryObject = {}

    testCase.count(emptyQueryObject, function(err, count) {
      if(err) {
        res(err)
      }
      res({count})
    })
  })
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
      for(const testCase of testCases) {
        /* eslint-enable no-unused-vars */
        testCasesData.push(testCase)
      }
      res(testCasesData.slice(0, limit || testCasesData.length))
    })
  })
}

const createSetConfig = (config) => async (configData) => {
  await config(configData).save()
}

const createGetConfig = (config) => async () => {
  return new Promise((res) => {
    config.find({}, function(err, configData) {
      if(err) {
        res(err)
      } else if(Array.isArray(configData)) {
        res(configData[0])
      } else {
        res(configData)
      }
    })
  })
}

const createSetToStorageRun = (run) => async (runData) => {
  console.log(runData)
  await run(runData).save()
}

const createGetStorageRunData = (run) => async (offset = 0, limit = 0) => {
  return new Promise((res) => {
    const emptyQueryObject = {}
    const runsData = []

    run.find(emptyQueryObject, null, {skip: offset}, function(err, runs) {
      if(err) {
        res(err)
      }
      /**
        * @example item
        * {
        *  run: run identifier,
        *  count: quantity of the runs  ,
        *  runStatus: exit code status,
        * }
        */
      for(const {run, count, runStatus} of runs) {
        runsData.push({run, count, runStatus})
      }
      res(runsData.slice(0, limit || runsData.length))
    })
  })
}


module.exports = {
  createSetToStorage,
  createGetStorageData,
  createGetStoragCount,

  createGetConfig,
  createSetConfig,

  createSetToStorageRun,
  createGetStorageRunData
}
