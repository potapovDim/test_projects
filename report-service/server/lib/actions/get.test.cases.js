const storage = require('../adapters')
const {parseIntCustom} = require('../utils')
/**
 *
 * @param {koa context object} ctx
 */
async function getTestCases(ctx) {

  const offset = parseIntCustom(ctx.request.query.offset)
  const limit = parseIntCustom(ctx.request.query.limit)

  ctx.status = 200
  ctx.body = await storage.getStorageData(offset, limit)

  return ctx
}

module.exports = {
  getTestCases
}
