import PubSub from 'pubsub-js'

function getFailReasons(failedReasons = {}, testCases = []) {

  const failedResonsKeys = Array.isArray(failedReasons) ? [...failedReasons] : Object.keys(failedReasons)

  const result = testCases.reduce(function(acc, testCase) {

    const failedReasonFromCurrentCase = failedResonsKeys.find(function(failedReason) {
      if('stack' in testCase) {
        return testCase.stack.includes(failedReason)
      } else {
        return testCase.stackTrace.includes(failedReason)
      }
    })

    if(failedReasonFromCurrentCase && acc[failedReasonFromCurrentCase]) {
      acc[failedReasonFromCurrentCase].push(testCase)
    } else if(failedReasonFromCurrentCase) {
      acc[failedReasonFromCurrentCase] = [testCase]
    } else {
      if(acc['Other reasons']) {
        acc['Other reasons'].push(testCase)
      } else {
        acc['Other reasons'] = [testCase]
      }
    }
    return acc
  }, {})

  return result
}

function mostFlakyCases(testCases) {
  return testCases.map(function({id}) {
    return id
  }).reduce(function(acc, caseId) {
    if(acc[caseId] === undefined) {
      acc[caseId] = 1
    } else {
      acc[caseId]++
    }
    return acc
  }, {})
}

function getRangeFailesByBuild(testCases, runStats = []) {
  const items = testCases.reduce(function(acc, testCase) {
    const {run, id} = testCase

    if(acc[run]) {
      acc[run].cases.push(testCase)
    } else {

      acc[run] = {cases: [testCase]}

      const runInfo = runStats.find((item) => item.run === run)

      if(!runInfo) {
        acc[run].buildExecutedCases = 0

        /**
         * @todo
         * specify common approach for pubSub for whole project
         */
        PubSub.publish('buildInfo_warning', {
          message: `
          Information for build number ${run} does not present,
          seems like issue with integration with Report-Service
          `,
          className: 'error'
        })

      } else {
        acc[run].buildExecutedCases = runInfo.count
        acc[run].runStatus = runInfo.runStatus
      }
    }
    return acc
  }, {})

  return Object.keys(items).reduce(function(acc, runNumber, index, originalArr) {

    if(index === 0) {

      acc.buildsCount = originalArr.length

      if(items[runNumber].buildExecutedCases === 0) {
        acc.allBuildsFails = 0
      } else {
        acc.allBuildsFails = items[runNumber].cases.length
      }

      acc.totalExecutedCases = items[runNumber].buildExecutedCases

    } else if(index === originalArr.length - 1) {

      acc.averageAmount = Math.floor(acc.allBuildsFails / originalArr.length)

    } else {
      /**
       * @description
       * in case if build information does not existst "{build: 'number', count: 222}"
       * this build should not take part in common statistics results
       */
      if(items[runNumber].buildExecutedCases !== 0) {
        acc.totalExecutedCases += items[runNumber].buildExecutedCases
        acc.allBuildsFails += items[runNumber].cases.length
      }
    }

    acc[runNumber] = {...items[runNumber]}
    acc[runNumber].failedCasesCount = items[runNumber].cases.length

    return acc
  }, {})
}

function getGroupedByCases(propName, testCases) {
  return testCases
    .map((item) => item[propName])
    .filter((item, index, testCasesGroupsNotUniq) => testCasesGroupsNotUniq.indexOf(item) === index)
    .reduce((groupedCases, groupValue) => {
      groupedCases[groupValue] = testCases.filter((testCase) => testCase[propName] === groupValue)
      return groupedCases
    }, {})
}

function pubSubSubscribe(message, listener) {
  PubSub.subscribe(message, listener)
}

export default {
  getFailReasons,
  getRangeFailesByBuild,
  getGroupedByCases,
  mostFlakyCases,
  //TODO temp location
  pubSubSubscribe
}
