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

function getRangeFailesByBuild(testCases, buildStats = []) {
  const items = testCases.reduce(function(acc, testCase) {
    const {build, id} = testCase

    if(acc[build]) {
      acc[build].cases.push(id)
    } else {
      acc[build] = {
        cases: [id],
        buildExecutedCases: buildStats.find((item) => item.build === build).count
      }
    }
    return acc
  }, {})

  return Object.keys(items).reduce(function(acc, buildNumber, index, originalArr) {

    if(index === 0) {
      acc.buildsCount = originalArr.length
      acc.allBuildsFails = items[buildNumber].cases.length
      acc.totalExecutedCases = items[buildNumber].buildExecutedCases
    } else if(index === originalArr.length - 1) {
      acc.averageAmount = Math.floor(acc.allBuildsFails / originalArr.length)
    } else {
      acc.totalExecutedCases += items[buildNumber].buildExecutedCases
      acc.allBuildsFails += items[buildNumber].cases.length
    }

    acc[buildNumber] = {...items[buildNumber]}
    acc[buildNumber].failedCasesCount = items[buildNumber].cases.length

    return acc
  }, {})
}

function getGroupedByCases(propName, testCases) {
  return testCases
    .map((item) => item[propName])
    .filter((item, index, testCasesGroupsNotUniq) => {
      return testCasesGroupsNotUniq.indexOf(item) === index
    })
    .reduce((groupedCases, groupValue) => {
      groupedCases[groupValue] = testCases.filter((testCase) => testCase[propName] === groupValue)
      return groupedCases
    }, {})
}

export {
  getFailReasons,
  getRangeFailesByBuild,
  getGroupedByCases,
  mostFlakyCases
}
