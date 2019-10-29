function getFailReasons(failedReasons = {}, testCaces = []) {

  const failedResonsKeys = Array.isArray(failedReasons) ? [...failedReasons] : Object.keys(failedReasons)

  const result = testCaces.reduce(function(acc, testCase) {

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

function mostFlakyCases(testCaces) {
  return testCaces.map(function({id}) {
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

function getRangeFailesByBuild() {
  const items = cases.reduce(function(acc, testCace) {
    const {build, id} = testCace
    if(acc[build]) {
      acc[build].cases.push(id)
    } else {
      acc[build] = {cases: [id]}
    }
    return acc
  }, {})

  return Object.keys(items).reduce(function(acc, buildNumber, index, originalArr) {

    if(index === 0) {
      acc.buildsCount = originalArr.length
      acc.allBuildsFails = items[buildNumber].cases.length
    } else if(index === originalArr.length - 1) {
      acc.averageAmount = Math.floor(acc.allBuildsFails / originalArr.length)
    } else {
      acc.allBuildsFails += items[buildNumber].cases.length
    }

    acc[buildNumber] = {...items[buildNumber]}
    acc[buildNumber].failedCasesCount = items[buildNumber].cases.length

    return acc
  }, {})
}

function getGroupedByCases(propName, testCaces) {
  return testCaces
    .map((item) => item[propName])
    .filter((item, index, testCasesGroupsNotUniq) => {
      console.log(testCasesGroupsNotUniq, testCasesGroupsNotUniq.findIndex)
      return testCasesGroupsNotUniq.indexOf(item) === index
    })
    .reduce((groupedCases, groupValue) => {
      groupedCases[groupValue] = testCaces.filter((testCase) => testCase[propName] === groupValue)
      return groupedCases
    }, {})
}

export {
  getFailReasons,
  getRangeFailesByBuild,
  getGroupedByCases,
  mostFlakyCases
}
