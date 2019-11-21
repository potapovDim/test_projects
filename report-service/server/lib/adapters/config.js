let config = {}

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
