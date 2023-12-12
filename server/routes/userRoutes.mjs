import express from 'express'
import { getUserInfo, signup } from '../controllers/userController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs'

const userRoutes = express.Router()

userRoutes.post('/signup', signup)
userRoutes.get('/profile', userAuthenticate, getUserInfo)

export default userRoutes
