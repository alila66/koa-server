const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const http = require('http');
const https = require('https');
const fs = require('fs');
const { default: enforceHttps } = require('koa-sslify');

const cnnvsRoute = require('./Router/API/CnnvsRoute')
const usersRoute = require('./Router/API/UsersRoute')

const router = new Router()
const app = new Koa()
app.use(bodyParser())

router.use("/api/cnnvs", cnnvsRoute)
router.use("/api/users", usersRoute)
app.use(router.routes())
    .use(router.allowedMethods())

router.get("/", async ctx => {
    ctx.body = { msg: 'Welcome to Koa2!' }
})

// Force HTTPS using default resolver
app.use(enforceHttps({
    port: 8088
}))

// index page
app.use(ctx => {
    ctx.body = "hello world from " + ctx.request.url;
});

// SSL options
var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.pem')
}

// start the server
// http.createServer(app.callback()).listen(8080, console.log(`server start on 8080`));
https.createServer(options, app.callback()).listen(8088, '0.0.0.0', console.log(`Now start ssl server on 8088...`));