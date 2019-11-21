const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function getReporterConfig(ctx) {

  ctx.status = 200

  ctx.body = await storage.getConfig()

  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function setReporterConfig(ctx) {

  const {config} = ctx.request.body

  await storage.setConfig(config)

  ctx.body = {data: 'OK'}

  ctx.status = 200
  return ctx
}

module.exports = {
  getReporterConfig,
  setReporterConfig
}
