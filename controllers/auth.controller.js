import crypto from "crypto"
import bcryptjs from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { verify } from "../helpers/googleverify.js"

const controller = {
    signup: async (req, res, next)=>{
        try {
            req.body.verified_code = crypto.randomBytes(10).toString("hex")
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
            
            const user = await User.create(req.body)

            return res.status(201).json({
                success:true,
                message: "User registrado"
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message: "Error al registrar el User"
            })
        }
    },

    signin: async (req, res, next)=>{
        try {
            let user = await User.findOneAndUpdate(
                {email: req.user.email},
                {online:true},
                {new: true}
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    user: user.user,
                    email: user.email,
                    image: user.image
                },
                process.env.SECRET,
                {expiresIn: "10h"}
            )

            user.password = null

            return res.status(200).json({
                success:true,
                message: "User logueado correctamente",
                response: {
                    token,
                    user: {
                        user: user.user,
                        email: user.email,
                        image: user.image,
                    }
                }
            })
            
        } catch (error) {
            res.status(500).json({
               success: false,
               message: "Error al autenticar el User",
            });
        }
    },

    googleSignin: async(req, res, next)=>{

        try {
            //verificar el token de google 
            const {name, email, image} = await verify(req.body.token_id)
            
            let user = await User.findOne({email})
            //verificar si el user existe
            if(!user){
            //Si el user no existe crear user
              const data = {
                name,
                email,
                image,
                password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                google: true,
                verified_code: crypto.randomBytes(10).toString("hex"),
              };

              user = await User.create(data)
                
            }
            //Si el user ya existe simplemente lo logueo
            user.online = true
            await user.save();
            const token = jwt.sign(
                {
                  id: user._id,
                  email: user.email,
                  name: user.name,
                  image: user.image,
                },
                process.env.SECRET,
                { expiresIn: "10h" }
              );

             res.status(200).json({
              success: true,
              message: "User logueado correctamente con google",
              response: {
                token,
                user: {
                  name: user.name,
                  email: user.email,
                  image: user.image,
                },
              },
            });
            
        } catch (error) {
            res.status(500).json({
              success: false,
              message: "Error al autenticar el User",
            });               
        }

    },

    signout: async (req, res, next)=>{
        try {
            const user = await User.findOneAndUpdate({email: req.user.email},
                {online:false},
                {new:true})
           return res.status(200).json({
            success:true,
            message:"User deslogueado"
           })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error "
            })
        }
    },
    token: async (req, res, next)=>{
        const { user } = req
        try {
            return res.status(200).json({
                user:{
                    name: user.name,
                    email: user.email,
                    image: user.image
                },
            })
        } catch (error) {
            next(error)            
        }
    }
}

export default controller