function mostFlakyCases() {
  return cases.map(function({id}) {
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
