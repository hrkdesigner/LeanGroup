const router = require('express').Router()
const User = require('../model/userModel')
const {validateRegister} = require('../Validation/validateRegister')


router.post('/', async (req, res) => {
    const { email } = req.body
    try {
        //Request validation properties
        const { error } = await validateRegister.validateAsync(req.body)
       
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        //To check if the user already exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({ message: "User Already exist" })
        }
        user = await User.create(req.body)
        res.status(201).send({ message: "User created!" })

    } catch (err) {
        res.status(403).send({ message: err.message })
    }
})




module.exports = router