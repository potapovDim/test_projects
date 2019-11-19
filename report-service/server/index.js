const Koa = require('koa2')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')


const app = new Koa()
const {router} = require('./lib/routs.js')
const store = require('./lib/adapters')

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())

if(process.env.NODE_ENV === 'debug' || process.env.DEBUG) {
  const logger = require('koa-logger')
  app.use(logger())
}


class ServiceWrapper {

  addCustomRouter(path, method, cb) {
    router[method](path, cb(store))
  }

  async beforeStart(callBack = () => {}) {
    return await callBack()
  }

  start(port = 3000) {
    this.beforeStart()
    return app.listen(port)
  }
}


module.exports = new ServiceWrapper()
