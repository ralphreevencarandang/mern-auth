import User from "../models/user.js";

export const getUserData = async (req, res) =>{
    const {userId} = req.body;

    if(!userId){
        return res.status(500).json({message: 'Cannot find user id'})
    }

    try {

        const user = await User.findById(userId, { _id: true, name:true, email: true});

        if(!user){
            return res.status(500).json({message: 'User not found'})
        }

        return res.status(200).json(user)
        
    } catch (error) {
        console.log('Error get user data controller', error);
        res.status(500).json({message: 'Inernal server error'})
        
    }
  
}