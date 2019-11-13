const path = require('path')
const fs = require('fs')

const staticPath = path.resolve(__dirname, '../../static/')

const defaultHtmlTemplate = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    Sorry web-app was not builded successfully
    <script type="text/javascript" src="bundle.js"></script>
  </body>
  </html>
`

const defaultScriptTemplate = `
  alert('Sorry web-app was not builded successfully')
`

function getWebApplication() {
  let appStatic = ''
  const expectedApp = `${staticPath}/index.html`
  if(fs.existsSync(expectedApp)) {
    appStatic += fs.readFileSync(expectedApp, {encoding: 'utf8'})
  } else {
    appStatic += defaultHtmlTemplate
  }
  return appStatic
}

function getWebApplicationScript() {
  let appStaticScript = ''
  const expectedAppScript = `${staticPath}/bundle.js`
  if(fs.existsSync(expectedAppScript)) {
    appStaticScript += fs.readFileSync(expectedAppScript, {encoding: 'utf8'})
  } else {
    appStaticScript += defaultScriptTemplate
  }
  return appStaticScript
}

function getStaticScripts(ctx) {
  ctx.header['Content-Type'] = 'text/javascript'
  ctx.status = 200
  ctx.body = getWebApplicationScript()
  return ctx
}

function getStaticHtml(ctx) {
  ctx.header['Content-Type'] = 'text/html'
  ctx.status = 200
  ctx.body = getWebApplication()
  return ctx
}

module.exports = {
  getStaticScripts,
  getStaticHtml
}
