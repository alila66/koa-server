const { dbOpen, dbClose } = require('./Database')
const { find } = require('../Models/CnnvModel')

class CnnvsController {

    async showInfo(ctx, next) {

        await dbOpen()
        let data = find()
        ctx.body = {
            status: true,
            data
        }
        await dbClose()
    }
}

module.exports = new CnnvsController()