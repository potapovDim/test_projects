const {exists, writeFile: wf, readFile: rf} = require('fs')

/**
 *
 * @param {any} data
 * @returns {string}
 */
function tryStringifyJson(data) {
  try {
    if(typeof data === 'string') {
      return data
    } else {
      return JSON.stringify(data)
    }
  } catch(error) {
    // eslint-disable-next-line no-console
    console.info(error.toString())
    return JSON.stringify(null)
  }
}

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
    exists(filePath, function(isExist) {
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
      rf(filePath, function(err, fileData) {
        if(err) {rej(err)}
        res(fileData.toString('utf8'))
      })
    })
  } else {
    return defaultValue ? defaultValue : '""'
  }
}

/**
 *
 * @param {string} filePath
 * @param {any} data
 * @returns {null|error}
 */
async function writeFile(filePath, data) {
  return new Promise((res) => {
    const dataToWrite = tryStringifyJson(data)
    wf(filePath, dataToWrite, function(err) {
      res(err || null)
    })
  }).catch((e) => e)
}

/**
 *
 * @param {object} obj
 * @param {array|string} props
 * @returns {object}
 */
function omitProps(obj, props) {
  props = Array.isArray(props) ? props : [props]
  props.forEach((prop) => {
    Reflect.deleteProperty(obj, prop)
  })
  return obj
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
  writeFile,
  tryParseJson,
  tryStringifyJson,
  omitProps
}
