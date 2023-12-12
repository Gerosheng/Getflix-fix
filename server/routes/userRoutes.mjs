import express from 'express'
import { deactivateAccount, getUserInfo, signup, updateUserInfo } from '../controllers/userController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs'

const userRoutes = express.Router()

userRoutes.post('/signup', signup)
userRoutes.get('/profile', userAuthenticate, getUserInfo)
userRoutes.put('/update', userAuthenticate, updateUserInfo)
userRoutes.put('/deactivate', userAuthenticate, deactivateAccount)

export default userRoutes
