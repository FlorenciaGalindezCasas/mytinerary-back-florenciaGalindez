import express from 'express';
import cityController from '../controllers/city.controller.js'
import passport from '../middlewares/passport.js';

const router = express.Router();

const {getCities, createCity, getCityById, updateCity, deleteCity} = cityController

router.get("/", getCities);

router.post("/", passport.authenticate("jwt",{ session:false }), createCity);

router.get("/:id", getCityById);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateCity
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCity
);

export default router;