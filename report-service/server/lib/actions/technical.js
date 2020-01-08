const storage = require('../adapters')

const {ADDAPTER = 'memory'} = process.env

async function getTechnicalInfo(ctx) {

  ctx.status = 200

  ctx.body = {
    ADDAPTER,
    currentConfig: await storage.getConfig(),
    testCasesStorageCount: (await storage.getAvaliableTestCases()).length,
    runsStorageCount: (await storage.getAvaliableRuns()).length
  }

  return ctx
}


module.exports = {
  getTechnicalInfo
}
