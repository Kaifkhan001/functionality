import jwt from 'jsonwebtoken';

export default async function verifyJWT(token){
    try {
        const decoded =  jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        console.log("Error in verifying jwt in helper file", error);

    }
}