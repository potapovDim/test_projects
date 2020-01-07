let config = {}

if(process.env.DEMO) {
  const conf = require('../../demo/config.json')
  config = conf
}

async function getConfig() {
  return {...config}
}

async function setConfig(newConfig) {
  config = {...config, ...newConfig}
}

module.exports = {
  getConfig,
  setConfig
}
