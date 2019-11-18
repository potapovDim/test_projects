const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function getRunsStatistics(ctx) {
  ctx.status = 200
  ctx.body = await storage.getStorageRunsData()

  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function addRunsStatistics(ctx) {

  const {runData} = ctx.request.body

  await storage.setToStorageRuns(runData)

  ctx.body = {data: 'OK'}

  ctx.status = 200
  return ctx
}

module.exports = {
  getRunsStatistics,
  addRunsStatistics
}
