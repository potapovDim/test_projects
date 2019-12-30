/* eslint-disable */

const service = require('.')

function prometeusFormatter(testCases, failedResonsArray) {
  /**
   * @example firstIteration
   * {
   *  'C14877': [
   *    {id: 'C14877', stackTrace: '...', date: '...', build: '...', env: '...'},
   *    {id: 'C14877', stackTrace: '...', date: '...', build: '...', env: '...'}
   *  ],
   *  'C14827': [
   *    {id: 'C14827', stackTrace: '...', date: '...', build: '...', env: '...'},
   *    {id: 'C14827', stackTrace: '...', date: '...', build: '...', env: '...'}
   *  ]
   * }
   */
  const firstIteration = testCases.reduce(function(acc, testCase) {
    if(acc[testCase.id] === undefined) {
      acc[testCase.id] = [testCase]
    } else {
      acc[testCase.id].push(testCase)
    }
    return acc
  }, {})

  /**
    * @example groupedTestCases
    * {
     *  'C14877': {
     *     'TimeoutError': [{id: 'C14877', stackTrace: '...', date: '...', build: '...', env: '...', count:1}],
     *     'Cannot read property': [{id: 'C14877', stackTrace: '...', date: '...', build: '...', env: '...', count: 2}]
     *  },
     * }
     */
  const groupedTestCases = Object.keys(firstIteration).reduce(function(acc, testCaseId) {
    acc[testCaseId] = failedResonsArray.reduce(function(failedReasonsAcc, failedReason) {

      const itemsArray = firstIteration[testCaseId].filter(function(testCase) {
        return testCase.stackTrace.includes(failedReason)
      })

      if(itemsArray.length) {
        const fildItemWithSameEnv = (env) => (item) => {
          return item.env === env
        }

        const groupedItemsArray = itemsArray
          .map(function(item) {
            item.count = 1
            item.failedReason = failedReason
            return item
          })
          .reduce(function(acc, item, index, originalArr) {

            const itemFirstIndex = originalArr.findIndex(fildItemWithSameEnv(item.env))

            if(itemFirstIndex !== index) {
              const itemIndexAcc = acc.findIndex(fildItemWithSameEnv(item.env))
              acc[itemIndexAcc].count += 1
            } else {
              acc.push(item)
            }

            return acc
          }, [])

        failedReasonsAcc[failedReason] = groupedItemsArray
      }

      return failedReasonsAcc
    }, {})

    return acc
  }, {})

  const destructed = Object.keys(groupedTestCases).reduce(function(acc, testCaseId) {
    Object.keys(groupedTestCases[testCaseId]).forEach(function(failedReason) {
      acc.push(...groupedTestCases[testCaseId][failedReason])
    })
    return acc
  }, [])

  return destructed.reduce(function(acc, testCase) {
    function escapeString(str) {
      return str.replace(/\n/g, '\\n').replace(/\\(?!n)/g, '\\\\');
    }
    function escapeLabelValue(str) {
      if(typeof str !== 'string') {
        return str;
      }
      return escapeString(str).replace(/"/g, '\\"');
    }
    // eslint-disable-next-line
    acc += `qa_autotest_results_total {case_id="${escapeLabelValue(testCase.id)}",branch="${escapeLabelValue(testCase.env)}",error="${escapeLabelValue(testCase.failedReason)}"} ${testCase.count}\n`
    return acc
  }, `# HELP qa_autotest_results_total total number of failed tests\n# TYPE qa_autotest_results_total counter\n`)
}


function metricsAddapter(store) {
  // get test cases

  return async function(ctx) {
    const testCases = await store.getStorageData()
    const config = await store.getConfig()

    ctx.body = prometeusFormatter(testCases, config.failedReasons)
    return ctx
  }
}


service.beforeStart(() => console.log('Server is started'))
service.addCustomRouter('/metrics', 'get', metricsAddapter)
service.start(3000)
