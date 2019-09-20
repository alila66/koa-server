const Router = require('koa-router')
const router = new Router()

const { dbOpen, dbClose } = require('../../Database')
const Cnnv = require('../../Models/CnnvModel')

/**
 * @route Post /api/cnnvs/show
 * @description 返回一个记录
 * @access  接口是公开的
 */
router.get("/show", async ctx => {
    await dbOpen()
    let findResult = await Cnnv.findOne()
    ctx.body = findResult
    await dbClose()
})

/**
 * @route Post /api/cnnvs/showall
 * @description 返回多个记录
 * @access  接口是公开的
 */
router.get("/showall", async ctx => {
    await dbOpen()
    let findResult = await Cnnv.find().limit(20)
    ctx.body = findResult
    await dbClose()
})
module.exports = router.routes()