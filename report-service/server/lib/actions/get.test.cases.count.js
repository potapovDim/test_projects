const storage = require('../adapters')
/**
 *
 * @param {koa context object} ctx
 */
async function getTestCasesCount(ctx) {

  ctx.status = 200
  ctx.body = await storage.getStorageBaseInfo()

  return ctx
}

module.exports = {
  getTestCasesCount
}
