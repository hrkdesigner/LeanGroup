const router = require('express').Router()
const User = require('../model/userModel')
const controller = require('../controller/controller')

router.get('/', controller, async (req, res) => {
    try {
        const userInformation = await User.findById(user_ID)
        if (!userInformation) return res.status(403).send({ message: "Not ahuthorized !!!" })
        res.status(201).send({ message: userInformation })
    } catch (err) {
        return res.status(403).send({ message: "Not ahuthorized !!" })
    }


})

router.post("/edit", controller, async (req, res) => {
    const {action} = req.body
    console.log(req.body)
    console.log(action)
    try{
        const result = await User.findByIdAndUpdate(user_ID, action, {new : true})
        res.status(201).send({ message: result })
    }catch(err){
        console.log(err)
    }
   
})


router.post("/create", controller, async (req, res) => {
    const {action} = req.body
    try{
        const result = await User.findById(user_ID)
        if(!result){
            return res.status(403).send({ message: "Not ahuthorized !!!" })
        }
        console.log(action)
        result.age = action
        result.save()
        res.status(201).send({ message: result })

    }catch(err){
        console.log(err)
    }
   
})


router.post("/delete", controller, async (req, res) => {
    try{
        const result = await User.findById(user_ID)
        if(!result){
            return res.status(403).send({ message: "Not ahuthorized !!!" })
        }
        result.set("age" , null)
        result.save()
        res.status(201).send({ message: result })

    }catch(err){
        console.log(err)
    }
   
})

module.exports = router