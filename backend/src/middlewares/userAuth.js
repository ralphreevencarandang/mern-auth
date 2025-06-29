import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(500).json({message: 'Not Authorized'})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        // we sign an ID to the token when login and register
        // if there is an ID we will add it to the body
        if(tokenDecode.id){
            // add the userID with the value of token decode in the body
            req.body.userId = tokenDecode.id;
        }else{
        res.status(500).json({message: 'Not Authorized'})
        }
        next()
    } catch (error) {
        console.log('Error in userAuth middleware', error)
        res.status(500).json({message: 'Internal server error'})
    }
}