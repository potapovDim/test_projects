const mongoose = require('mongoose')
const {testCaseModel, configModel, runModel} = require('./models')
const {
  createGetStorageData,
  createSetToStorage,
  createGetStoragCount,
  createGetConfig,
  createSetConfig,
  createGetStorageRunData,
  createSetToStorageRun
} = require('./mongo')

const {getConfig} = require('./conf')

// temp for debug
const connectedMongoose = mongoose.createConnection(
  `mongodb://127.0.0.1:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// mongo models
const testCase = testCaseModel(connectedMongoose)
const config = configModel(connectedMongoose)
const run = runModel(connectedMongoose)

module.exports = {
  getStorageData: createGetStorageData(testCase),
  getStorageDataCount: createGetStoragCount(testCase),
  setToStorage: createSetToStorage(testCase),
  getConfig: createGetConfig(config),
  setConfig: createSetConfig(config),
  getStorageRunsData: createGetStorageRunData(run),
  setToRunsStorage: createSetToStorageRun(run)
}
