// Schema Properties Validation
const Joi = require('@hapi/joi')
const validateRegister = Joi.object({
    firstName: Joi.string().min(5).max(10).required().lowercase().messages({
        'string.base': `"First name" should be a type of 'text'`,
        'string.empty': `"First name" cannot be an empty field`,
        'any.required': `"First name" is a required field`
    }).label("First Name"),
    lastName: Joi.string().required().lowercase().label("Last Name"),
    email: Joi.string().email().required().lowercase().label("Email"),
    password: Joi.string().required().label("Password")
})

const validateLogin =  Joi.object({
    email: Joi.string().email().required().lowercase().label("Email"),
    password: Joi.string().required().label("Password")
    })

module.exports = {validateRegister, validateLogin}