// new instance of the Router
const Router = require('koa-router')
const router = new Router()

const {getTestCases, createTestCase, getStaticHtml, getStaticScripts} = require('./actions')

// view rout return index.html

// script static serving
router.get('/bundle.js', getStaticScripts)
router.get('/view', getStaticHtml)

router.post('/add-new-case', createTestCase)
router.get('/get-test-cases', getTestCases)

module.exports = {
  router
}
