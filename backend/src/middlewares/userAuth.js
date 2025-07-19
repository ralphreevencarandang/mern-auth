import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next)=>{
    try {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: 'Not Access denied. No token provided.'})
        
    }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        // we sign an ID to the token when login and register
        // if there is an ID we will add it to the body
        if(tokenDecode.id){
            // add the userID with the value of token decode in the body
             if (!req.body) req.body = {};
                req.body.userId = tokenDecode.id;
        }else{
               return res.status(401).json({ message: 'Not Authorized' });
        }
        next()
    } catch (error) {
        console.log('Error in userAuth middleware', error)
         if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(500).json({ message: 'Internal server error middleware' });
        }
    }
}