const Router = require('koa-router')
const router = new Router()
const gravatar = require('gravatar')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { dbOpen, dbClose } = require('../../Database')
const User = require('../../Models/UserModel')

/**
 * @route Get /api/users/test
 * @description 测试接口
 * @access  接口是公开的
 */
router.get("/test", async ctx => {
    ctx.status = 200
    ctx.body = { msg: "api works" }
})

/**
 * @route Post /api/users/register
 * @description 用户注册
 * @access  接口是公开的
 */
router.post("/register", async ctx => {
    let email = ctx.request.body.email
    console.log(email)
    await dbOpen()
    let findResult = await User.find({ email: email })

    if (findResult.length > 0) {
        ctx.status = 500
        ctx.body = { msg: 'User existed' }
    } else {
        let avatar = gravatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' });

        let newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
            avatar,
        })

        let salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(ctx.request.body.password, salt);

        await newUser.save().then(user => {
            ctx.body = user
        }).catch(err => {
            console.log(err)
        })
    }
    await dbClose()
})

/**
 * @route Get /api/users/test
 * @description 测试接口
 * @access  接口是公开的
 */
router.post("/login", async ctx => {
    await dbOpen()
    let findResult = await User.find({ email: ctx.request.body.email })
    let user = findResult[0]
    await dbClose()

    if (findResult.length == 0) {
        ctx.status = 404
        ctx.body = { msg: '用户不存在!' }
    } else {
        let result = bcrypt.compareSync(ctx.request.body.password, user.password); // 判断密码的hash值是否相等
        if (result) {
            let payload = {id: user.id, name: user.name, avatar: user.avatar}
            let token = jwt.sign(payload, 'secret', {expiresIn: 3600});

            ctx.status = 200
            ctx.body = { 
                success: true,
                token: 'Bearer ' + token
             }
        }else{
            ctx.status = 404
            ctx.body = { msg: '密码不正确!' }
        }
    }
})

module.exports = router.routes()