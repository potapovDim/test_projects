const {ADDAPTER = 'memory'} = process.env

module.exports = require(`./${ADDAPTER}`)
