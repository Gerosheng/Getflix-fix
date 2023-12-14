import Joi from "joi"

const email = Joi.string().email().required()
const firstname = Joi.string().alphanum().min(3).max(30).required()
const lastname = Joi.string().alphanum().min(3).max(30).required()
const message= Joi.string().min(3).max(500).required()

export const contactFormValidation = Joi.object({
    firstname,
    lastname,
    email,
    message
})