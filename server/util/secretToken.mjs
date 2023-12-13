import 'dotenv/config'
import jwt from "jsonwebtoken";

const createAccessToken = (user) =>
jwt.sign(
    { data: {
        "id": user.id,
        "email": user.email,
        "roles": user.roles
    } },
     process.env.ACCESS_TOKEN_KEY, 
    {expiresIn: "2h"},
    );

export { 
    createAccessToken,
}