jwt = require('jsonwebtoken')

module.exports = function userController(req,res,next){
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) {
        return res.status(403).send({ message: "Not ahuthorized" })
    }
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) return res.status(403).send({ message: "Not ahuthorized" })
        global.user_ID = data.id
    })

    next()
}