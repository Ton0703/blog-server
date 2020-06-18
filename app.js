const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const cors = require('koa2-cors')
const parameter = require('koa-parameter')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
const path = require('path')

const routing = require('./routes')
const { open } = require('./db/connect')
const app = new Koa()

open()
app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(error({
    postFormat: (e, {
        stack,
        ...rest
    }) => process.env.NODE_ENV === 'production' ? rest : {
        stack,
        ...rest
    }
}));
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true
    }
}));
app.use(parameter(app))
routing(app)

app.listen(3030, () => {
    console.log('后端成功启动！')
})