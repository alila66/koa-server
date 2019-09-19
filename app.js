const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const http = require('http');
const https = require('https');
const fs = require('fs');
const { default: enforceHttps } = require('koa-sslify');

// const port = process.env.PORT || 5000
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
    // ctx.body = ctx.request.body
    ctx.body = { msg: 'Welcome to Koa2!' }
})

// app.listen(port, () => {
//     console.log(`server start on ${port}`)
// })

// Force HTTPS using default resolver
app.use(enforceHttps({
    port: 8081
}));

// index page
app.use(ctx => {
    ctx.body = "hello world from " + ctx.request.url;
});

// SSL options
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.pem')
}

// start the server
http.createServer(app.callback()).listen(8080, console.log(`server start on 8080`));
https.createServer(options, app.callback()).listen(8088);