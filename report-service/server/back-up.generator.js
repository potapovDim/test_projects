const {AssertionError} = require('chai')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const getNumber = (n = 1000, from = 0) => Math.floor((Math.random() * (n - from) + from))

const getRandomTimeName = () => ['days', 'hours'][getNumber(2)]

const generateEnv = () => `feature-TICKET-${getNumber(50)}`
const getDate = () => +moment().subtract(getNumber(3), getRandomTimeName())

const cases = Array(3000).fill('_').map(() => ({
  id: `TEST_CASE_ID-${getNumber(500)}`,
  stackTrace: new AssertionError(`
    EXPECTATION NUMBER :${getNumber(10)},
    expect ${getNumber(30)} to not eql ${getNumber(100)}
  `).toString(),
  env: generateEnv(),
  date: getDate(),
  build: getNumber(40)
}))

const builds = cases
  .map((testCase) => testCase.build)
  .filter((item, index, arr) => arr.indexOf(item) === index)
  .map((item) => ({build: item, count: getNumber(500, 150)}))


const config = {
  failedReasons: [
    'EXPECTATION NUMBER :6',
    'EXPECTATION NUMBER :0',
    'EXPECTATION NUMBER :1',
    'EXPECTATION NUMBER :9',
    'EXPECTATION NUMBER :4',
    'EXPECTATION NUMBER :2',
    'EXPECTATION NUMBER :4',
    'EXPECTATION NUMBER :9',
    'EXPECTATION NUMBER :6',
    'EXPECTATION NUMBER :2'
  ]
}


fs.writeFileSync(path.resolve(__dirname, './temp/1-tests_backup.json'), JSON.stringify(cases))
fs.writeFileSync(path.resolve(__dirname, './temp/1-builds_backup.json'), JSON.stringify(builds))

module.exports = {
  config
}
