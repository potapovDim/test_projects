const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function getBaseInfo(ctx) {
  ctx.status = 200
  ctx.body = await storage.getStorageBaseInfo()

  return ctx
}

module.exports = {
  getBaseInfo
}
