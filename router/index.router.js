//enrutador principal
import express from "express";
import cityRouter from "./cities.router.js"

const router = express.Router();
//req: obj solicitud
//res: onj respuesta
router.get('/', (req, res)=> {
    res.send('Hello world')
}); //metodo para obtener informacion

// me permite responder a cualquier tipo de peticion

router.use('/cities', cityRouter);


export default router;