const path = require('path')
const fs = require('fs')

// new instance of the Router
const Router = require('koa-router')
const router = new Router()

const {getTestCases, createTestCase} = require('./actions')

// view rout return index.html
router.get('/view', (ctx) => {
  ctx.header['Content-Type'] = 'text/html'
  const indexStatic = fs.readFileSync(
    path.resolve(__dirname, './static/index.html'), {encoding: 'utf8'}
  )
  ctx.status = 200
  ctx.body = indexStatic
  return ctx
})

// script static serving
router.get('/script/index.js', (ctx) => {
  ctx.header['Content-Type'] = 'text/javascript'
  const indexStatic = fs.readFileSync(
    path.resolve(__dirname, './static/script/index.js'), {encoding: 'utf8'}
  )
  ctx.status = 200
  ctx.body = indexStatic
  return ctx
})

router.post('/add-new-case', createTestCase)
router.get('/get-test-cases', getTestCases)

module.exports = {
  router
}
