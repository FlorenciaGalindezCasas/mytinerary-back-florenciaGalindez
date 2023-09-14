import User from "../../models/User.js"

export const accountExistsSingup = async(req, res, next) =>{
    const user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).json({
          success: false,
          message: "Already registered user",
        });
    }

    return next()
}