const URL = require('url')
const querystring = require('querystring')
const {stringify} = require('./utils')
const {DEBUG_PROCESS} = process.env

function logRequest(reqUrl, reqHeaders, reqMethod, reqBody, {body, status, headers}) {

  if(DEBUG_PROCESS) {
    console.log('\n\n')
    console.log(`Request url: ${reqUrl}`)
    console.log(`Request headers: ${stringify(reqHeaders)}`)
    console.log(`Request method: ${reqMethod}`)
    console.log(`Request body: ${stringify(reqBody)}`)
    console.log('\n')
    console.log('********************************************')
    console.log('\n')
    console.log(`Response body: ${stringify(body)}`)
    console.log(`Response status: ${status}`)
    console.log(`Response headers: ${stringify(headers)}`)
  }
}

function formReqHeader(headers, token, basicAuth, body) {

  if(token) {
    headers['Authorization'] = basicAuth ? `Basic ${token}` : `Bearer ${token}`
  }

  if(!headers['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json'
  }

  if(headers.noNeeded) {
    headers = {}
  }

  return headers
}

function formReqUrl(host, path, queries) {
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
  return body
}

module.exports = {
  formReqBody,
  formReqUrl,
  formReqHeader,
  logRequest
}
