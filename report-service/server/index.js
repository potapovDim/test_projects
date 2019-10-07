const Koa = require('koa2')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const app = new Koa()
const {router} = require('./lib/routs.js')

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())

if(process.env.NODE_ENV === 'debug') {
  const logger = require('koa-logger')
  app.use(logger())
}

app.listen(3000);
