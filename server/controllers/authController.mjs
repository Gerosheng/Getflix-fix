import User from '../models/userModel.mjs'
import { signInValidation } from '../validations/userValidation.mjs'
import { parseError } from '../util/helpers.mjs'
import { createAccessToken } from '../util/secretToken.mjs'
import responseHandler from '../util/handlers/responseHandlers.mjs'

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log( { email, password })

    await signInValidation.validateAsync({ email, password })

    const loggingUser = await User.findOne({ email })

    if (loggingUser && loggingUser.comparePasswords(password)) {
      const accessToken = createAccessToken(loggingUser)

      res.cookie('jwt', accessToken, {
        //sameSite: "None",
        withCredentials: true,
        httpOnly: true, //for dev purposes change to true for prod
        maxAge: 2 * 60 * 60 * 1000, //cookie expiry: set to match aT (2Hours)
      })

      responseHandler.created(res, {
        accessToken,
        ...loggingUser._doc,
        id: loggingUser.id,
        message: 'User logged in successfully',
        success: true,
      })
    } else {
      throw new Error('Invalid login credentials')
    }
  } catch (err) {
    res.status(401).send(parseError(err))
  }
}

const logout = (req, res) => {
  const cookies = req.cookies

  if (cookies && cookies.jwt) {
    res.clearCookie(
      'jwt' /**, { httpOnly: true, sameSite: 'None', secure: true }*/,
    )
    responseHandler.ok(res, {
      message: 'Cookie cleared',
    })
  } else {
    responseHandler.empty(res)
  }
}

export { login, logout }
