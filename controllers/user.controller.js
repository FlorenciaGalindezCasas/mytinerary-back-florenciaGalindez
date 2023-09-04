import User from "../models/User.js";

const controller = {
    getUsers: async(req,res) => {
       try {
        const users = await User.find(req.query.name)
        return res.status(200).json({
          success: true,
          users
        })
        
       } catch (error) {
         console.log(error);
         return res.status(500).json({
           success: true,
           message: "Failed to get the users",
         });
        
          }
    },

    createUser: async(req, res) => {
        try {
           await User.create(req.body)
           return res.status(200).json({
            success:true,
            message: "User created"
           })
            
        } catch (error) {
            return res.status(500).json({
              success: false,
               message:"Failed to create user "  
            })   
        }
    },

    deleteUser: async(req,res)=>{
        try {
            await User.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: "User delete"
            })
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete user"
            })
            
        }
    }
}

export default controller