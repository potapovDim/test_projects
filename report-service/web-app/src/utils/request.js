// polifill
import 'whatwg-fetch'
import {stringify} from './common'

const {ENV} = process.env
const host = ENV === 'production' ? window.origin : 'http://localhost:3000'

function fetchy(method = 'POST', path, body, cb = (arg) => arg) {
  /**
   * @token will be used for future
   */
  const token = localStorage.getItem('token')

  return fetch(`${host}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: stringify(body)
  }).then((resp) => resp.json()).then(cb)
}

/**
 *
 * @param {function} cb
 * @returns any
 * @example data
 *
 */

/**
 *
 * @param {function} cb
 * @returns any
 * @example data
 * {count: number} or {err}
 */

function getTestCases(cb) {
  return fetchy('GET', '/get-test-cases').then(cb)
}
function getTestCaseCount(cb) {
  return fetchy('GET', '/get-test-cases-count').then(cb)
}

function getBaseInfo(cb) {
  return fetchy('GET', '/get-test-cases-count').then(cb)
}

export {
  fetchy,
  getTestCases,
  getTestCaseCount
}
