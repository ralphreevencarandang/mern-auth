import User from "../models/user.js";

export const getUserData = async (req, res) =>{
    try {

    const {userId} = req.body;

    if(!userId){
        return res.status(400).json({message: 'Cannot find user id'})
    }


        const user = await User.findById(userId, { _id: true, name:true, email: true});

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).json(user)
        
    } catch (error) {
        console.log('Error get user data controller', error);
         if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        
        return res.status(500).json({ message: 'Internal server error' });
    }
  
}