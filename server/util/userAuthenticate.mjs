import User from '../models/userModel.mjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import responseHandler from './handlers/responseHandlers.mjs';

const userAuthenticate = async (req, res, next) => {
    
    const token = req.cookies && req.cookies.jwt;
    
    if (!token) {
        return responseHandler.unauthorize(res, "No authentication token provided");
    }
    
    try {    
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY
        );

        if (!decodedToken) {
            return responseHandler.unauthorize(res, 'Invalid authentication token');
        }
        const verifiedUser = await User.findById(decodedToken.data.id);

        if(!verifiedUser) {
           return responseHandler.notFound(res);
        };

        req.user = verifiedUser;

        if (!verifiedUser.isActive) {
            return responseHandler.unauthorize(res, 'Account is not active');
        }        
        next();

    } catch (error) {
        responseHandler.unauthorize(res, "Error during authentication");
    }
};

export default userAuthenticate;