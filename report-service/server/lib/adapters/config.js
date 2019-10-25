let config = {}

function getConfig() {
  return {...config}
}

function setConfig(newConfig) {
  config = {...config, ...newConfig}
}

module.exports = {
  getConfig,
  setConfig
}
