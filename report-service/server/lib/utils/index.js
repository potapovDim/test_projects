/**
 * @param {any} arg
 * @returns {undefined|number}
 */
function parseInt(arg) {
  const parsed = Number(arg)
  if(isNaN(Number(arg))) {
    return undefined
  } else {
    return Math.floor(parsed)
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
  parseInt,
  ReportServiceError
}
