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

class ReportServiceError extends Error {
  constructor(...args) {
    super(...args)

    this.name = 'ReportServiceError'

    Error.captureStackTrace(this, ReportServiceError)
  }
}

module.exports = {
  parseIntCustom,
  ReportServiceError
}
