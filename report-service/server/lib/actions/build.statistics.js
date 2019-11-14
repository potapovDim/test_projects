const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function getBuildStatistics(ctx) {
  ctx.status = 200
  ctx.body = await storage.getStorageBuilsdData()

  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function addBuildStatistics(ctx) {

  const {buildData} = ctx.request.body

  await storage.setToStorageBuilds(buildData)

  ctx.body = {data: 'OK'}

  ctx.status = 200
  return ctx
}

module.exports = {
  getBuildStatistics,
  addBuildStatistics
}
