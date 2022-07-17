const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/userModel')
const {validateLogin} = require('../Validation/validateRegister')
const jwt = require('jsonwebtoken')



router.post('/', async (req, res) => {
    const { email, password } = req.body
    //Check Input Validation
    try {
        const { error } = await validateLogin.validateAsync(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        //Check User exists or not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({ message: "Incorrect Username/Password" })
        }
        //Dehashing and checking password
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(400).send({ message: "Incorrect Username/Password" })
        }
        //Token generating
        const token = jwt.sign({id : user._id}, process.env.SECRET)
      
        res.status(200).send({ message: "Logged In", token })
    } catch (err) {
        res.status(403).send({ message: err.message })
    }
})

module.exports = router