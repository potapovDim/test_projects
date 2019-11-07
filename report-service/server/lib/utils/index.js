const fs = require('fs')

/**
 *
 * @param {any} data
 * @returns {any} parsedData
 */
function tryParseJson(data) {
  try {
    return JSON.parse(data)
  } catch(error) {
    // eslint-disable-next-line no-console
    console.info(error.toString())
    return null
  }
}

/**
 * @param {any} arg
 * @returns {undefined|number}
 */
function parseIntCustom(arg) {
  const parsed = Number(arg)
  if(isNaN(parsed)) {
    return undefined
  } else {
    return Math.floor(parsed)
  }
}

/**
 *
 * @param {string} filePath
 * @returns {boolean} does file exist
 */
function fileExist(filePath) {
  return new Promise(function(res) {
    fs.exists(filePath, function(isExist) {
      res(isExist)
    })
  })
}

/**
 *
 * @param {string} filePath
 * @param {any} defaultValue
 * @returns {string|any}
 */
async function readFile(filePath, defaultValue) {
  if(await fileExist(filePath)) {
    return new Promise(function(res, rej) {
      // it is not a stream
      fs.readFile(filePath, function(err, fileData) {
        if(err) {rej(err)}
        res(fileData.toString('utf8'))
      })
    })
  } else {
    return defaultValue ? defaultValue : '""'
  }
}


class ReportServiceError extends Error {
  constructor(...args) {
    super(...args)

    this.name = 'ReportServiceError'

    Error.captureStackTrace(this, ReportServiceError)
  }
}

module.exports = {
  parseIntCustom,
  ReportServiceError,
  readFile,
  tryParseJson
}
