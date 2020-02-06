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

/**
 *
 * @param {koa context object} ctx
 */
async function addTestCase(ctx) {
  /**
   * @data
   * @example
   * {
   *  id: string,
   *  build: string,
   *  date: string,
   *  stackTrace: string
   * }
   *
  */
  const {data} = ctx.request.body

  await storage.setToStorage(data)

  ctx.status = 200
  ctx.body = {data: 'OK'}

  return ctx
}

/**
 *
 * @param {koa context object} ctx
 */
async function getProjects(ctx) {
  ctx.status = 200
  ctx.body = await storage.getProjects()
  return ctx
}
module.exports = {
  getTestCases,
  addTestCase,
  getProjects
}
