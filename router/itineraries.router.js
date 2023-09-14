import express from "express"
import itinerayController from "../controllers/itinerary.controller.js"
import passport from "../middlewares/passport.js";

const router = express.Router()

const {getItineraries, getItineraryById, getItinerariesByCityId, createItinerary, updateItinerary, deleteItinerary} = itinerayController

router.get("/", getItineraries)

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createItinerary
);

router.get("/:id", getItineraryById);

router.get("/cities/:id", getItinerariesByCityId);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateItinerary
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteItinerary
);

export default router