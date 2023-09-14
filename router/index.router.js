//enrutador principal
import express from "express";
import cityRouter from "./cities.router.js"
import userRouter from "./users.router.js"
import itineraryRouter from "./itineraries.router.js"
import authRouter from "./auth.router.js"

const router = express.Router();
//req: obj solicitud
//res: onj respuesta
router.get('/', (req, res)=> {
    res.send('Hello world')
}); //metodo para obtener informacion

// me permite responder a cualquier tipo de peticion

router.use('/cities', cityRouter);

router.use("/users", userRouter);

router.use("/itineraries", itineraryRouter);

router.use("/auth", authRouter)


export default router;