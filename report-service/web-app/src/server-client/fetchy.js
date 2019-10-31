// polifill
import 'whatwg-fetch'
import {stringify} from '../utils/common'
import lStorage from '../utils/local.storage'


function fetchyBase(method = 'POST', path, body, cb = (arg) => arg) {
  let host = lStorage.lsGet('config') && lStorage.lsGet('config').serverHost || 'http://localhost:3000'

  /**
   * @token will be used for future
   */
  const token = localStorage.getItem('token')

  if(host[host.length - 1] === '/') {
    host = host.replace(new RegExp(host[host.length - 1] + '$'), '')
  }

  return fetch(`${host}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: stringify(body)
  }).then((resp) => {
    const contentType = resp.headers.get('content-type')
    if(contentType.includes('application/json')) {
      return resp.json()
    } else {
      return resp.text()
    }
  }).then(cb)
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

