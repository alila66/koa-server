const Router = require('koa-router')
const router = new Router()

const { dbOpen, dbClose } = require('../../Database')
const Cnnv = require('../../Models/CnnvModel')

/**
 * @route Post /api/cnnvs/show
 * @description 测试接口
 * @access  接口是公开的
 */
router.get("/show", async ctx => {
    await dbOpen()
    let findResult = await Cnnv.findOne()
    ctx.body = findResult
    await dbClose()
})
module.exports = router.routes()