import User from "../../models/User.js"

export const accountHasBeenVerified = (req, res, next) =>{
    if(req.user.verified){
        return next()
    }

    res.status(400).json({
      success: true,
      message: "Unverified user",
    });
}