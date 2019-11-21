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


module.exports = {
  dropCurrentStatistics
}
