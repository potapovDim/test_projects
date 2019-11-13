const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function getBuildStatistics(ctx) {

  ctx.status = 200

  ctx.body = storage.getConfig()

  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function addBuildStatistics(ctx) {

  const {config} = ctx.request.body

  storage.setConfig(config)

  ctx.body = {data: 'OK'}

  ctx.status = 200
  return ctx
}

module.exports = {
  getBuildStatistics,
  addBuildStatistics
}
