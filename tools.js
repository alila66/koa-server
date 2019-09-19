const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(ctx.request.body.password, salt, function (err, hash) {
        return hash
        console.log(hash)
    })
})