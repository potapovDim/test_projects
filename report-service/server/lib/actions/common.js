const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function dropCurrentStatistics(ctx) {
  ctx.status = 200
  ctx.body = await storage.dropMemoryStatistics()
  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function storeCurrentStatistics(ctx) {
  ctx.status = 200
  ctx.body = await storage.storeCurrentStatistics()
  return ctx
}

module.exports = {
  dropCurrentStatistics,
  storeCurrentStatistics
}
