const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const cnnvsCtl = require('./Controller/CnnvsController')

router.get("/", cnnvsCtl.showInfo)

app.use(router.routes())
	.use(router.allowedMethods())

// app.use(async ctx => {
//     ctx.body = 'Hello alila!'
// });

app.listen(3000)