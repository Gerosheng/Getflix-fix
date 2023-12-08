import Joi from 'joi'

const email = Joi.string().email().required()
//const username = Joi.string().alphanum().min(3).max(30).required();
const firstname = Joi.string().alphanum().min(3).max(30).required()
const lastname = Joi.string().alphanum().min(3).max(30).required()
//const age = Joi.number().integer().min(0).max(150).required();

const message =
  'Must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character'

const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

const password = Joi.string()
  .pattern(passwordPattern)
  .message(message)
  .required()

export const signUp = Joi.object({
  firstname,
  lastname,
  // age,
  email,
  // username,
  password,
})

export const signIn = Joi.object({
  email,
  password,
})