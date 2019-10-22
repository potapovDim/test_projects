const storage = require('../adapters')

/**
 *
 * @param {koa context object} ctx
 */
async function createTestCase(ctx) {
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

module.exports = {
  createTestCase
}
