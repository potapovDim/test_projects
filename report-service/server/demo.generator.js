const {AssertionError} = require('chai')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const getNumber = (n = 1000, from = 0) => Math.floor((Math.random() * (n - from) + from))

const getRandomTimeName = () => ['hours', 'days'][getNumber(2)]

const generateEnv = () => `feature-TICKET-${getNumber(100)}`
const getDate = () => +moment().subtract(getNumber(3), getRandomTimeName())

const cases = Array(3000).fill('_').map(() => ({
  id: `TEST_CASE_ID-${getNumber(100)}`,
  stackTrace: new AssertionError(`
    EXPECTATION NUMBER :${getNumber(10)},
    expect ${getNumber(30)} to not eql ${getNumber(100)}
  `).toString(),
  env: generateEnv(),
  date: getDate(),
  run: getNumber(100)
}))


const runs = cases
  .map((testCase) => testCase.run)
  .filter((item, index, arr) => arr.indexOf(item) === index)
  .map((item) => ({
    run: item,
    count: getNumber(500, 150),
    runStatus: getNumber(0, 2)
  }))


const config = {
  isSuccess: 0,
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

fs.writeFileSync(path.resolve(__dirname, './demo/tests.json'), JSON.stringify(cases))

fs.writeFileSync(path.resolve(__dirname, './demo/runs.json'), JSON.stringify(runs))

fs.writeFileSync(path.resolve(__dirname, './demo/config.json'), JSON.stringify(config))
