// polifill
import 'whatwg-fetch'
import {stringify} from './common'

const {ENV} = process.env
const host = ENV === 'production' ? window.origin : 'http://localhost:3000'

function fetchyBase(method = 'POST', path, body, cb = (arg) => arg) {
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

const fetchy = {
  post: fetchyBase.bind(this, 'POST'),
  get: fetchyBase.bind(this, 'GET'),
  put: fetchyBase.bind(this, 'PUT'),
  delete: fetchyBase.bind(this, 'DELETE'),
}

export {
  fetchy
}

