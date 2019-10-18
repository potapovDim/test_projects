const URL = require('url')
const querystring = require('querystring')
const {stringify} = require('./utils')
const {logClientWork} = require('./logger')
const {DEBUG_PROCESS} = process.env

function logRequest(reqUrl, reqHeaders, reqMethod, reqBody, {body, status, headers}) {

  if(DEBUG_PROCESS) {
    logClientWork(`
      \n
      REQUEST: \n ${reqMethod} HOST: ${reqUrl} \n HEADERS: ${stringify(reqHeaders)} \n PAYLOADS: ${stringify(reqBody)}
      \n
      RESPONSE: \n BODY: ${stringify(body)} \n STATUS: ${status} \n HEADERS: ${stringify(headers)}
    `)
  }
}

function formReqHeader(headers = {}, token = null, basicAuth = null, body) {

  if(token) {
    headers['Authorization'] = basicAuth ? `Basic ${token}` : `Bearer ${token}`
  }

  if(!headers['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

function formReqUrl(host, path = '', queries) {
  if(queries) {
    if(typeof queries === 'string') {
      queries = queries.startsWith('?') ? queries : `?${queries}`
    } else {
      queries = `?${querystring.stringify(queries)}`
    }
    path = `${path}${queries}`
  }

  return URL.resolve(host, path)
}

function formReqBody(body) {
  return stringify(body)
}

module.exports = {
  formReqBody,
  formReqUrl,
  formReqHeader,
  logRequest
}
