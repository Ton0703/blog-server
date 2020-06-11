const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const cors = require('koa-cors')
const parameter = require('koa-parameter')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
const path = require('path')

const routing = require('./routes')
const { open } = require('./db/connect')
const app = new Koa()

open()
app.use(cors())
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