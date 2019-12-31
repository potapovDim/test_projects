const fs = require('fs')
const path = require('path')
const url = require('url')

const {HOST, CONF_FILE = ''} = process.env

/**
 * temp config is useless
 * will be implemented
 */

const {ReportServiceError} = require('../../utils')

function validateAndGetConfig() {

  const confPath = path.resolve(process.cwd(), CONF_FILE)

  if(CONF_FILE && fs.existsSync(confPath)) {
    return require(confPath)
  } else if(!CONF_FILE) {
    if(!HOST) {
      console.warn('HOST was not provided, will be used default host and port: mongodb://0.0.0.0:27017')
      return {host: 'mongodb://0.0.0.0:27017'}
    }
    return {host: HOST}
  }

  throw new ReportServiceError(`
    Report file with path ${CONF_FILE} was not found
  `)
}

function getConfig() {
  return validateAndGetConfig()
}

module.exports = {
  getConfig
}