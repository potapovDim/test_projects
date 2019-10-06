const fs = require('fs')
const path = require('path')
// const url = require('url')

const {ReportServiceError} = require('../../utils')

function addBasicAuthToUrl(username, password) {
  // implementation
}

function validateAndGetConfig() {
  let {HOST, CONF_FILE} = process.env

  const confPath = path.resolve(process.cwd(), CONF_FILE)

  if(CONF_FILE && fs.existsSync(confPath)) {
    return require(confPath)
  } else if(!CONF_FILE) {
    if(!HOST) {
      console.warn('HOST was not provided, will be used default host and port: mongodb://0.0.0.0:27017')
      HOST = 'mongodb://0.0.0.0:27017'
    }
    return {host: HOST}
  }

  throw new ReportServiceError(`
    Report file with path ${CONF_FILE} was not found
  `)
}

function getConfig() {
  const requiredKeys = ['host']


  const conf = validateAndGetConfig()

}
