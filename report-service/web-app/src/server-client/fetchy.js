// polifill
import 'whatwg-fetch'
import {stringify} from '../utils/common'
import lStorage from '../utils/local.storage'


function fetchyBase(method = 'POST', path, body, cb = (arg) => arg) {
  const host = lStorage.lsGet('serverHost') ? lStorage.lsGet('serverHost') : 'http://localhost:3000'
  /**
   * @token will be used for future
   */
  const token = localStorage.getItem('token')

  if(host[host.length - 1] === '/' && path[0] === '/') {

  }

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

