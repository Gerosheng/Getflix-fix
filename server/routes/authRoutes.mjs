import express from 'express'
import { login, logout } from '../controllers/authController.mjs'
import  userAuthenticate  from '../util/userAuthenticate.mjs'

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/logout', logout);

export default authRoutes