import express from "express"
import itinerayController from "../controllers/itinerary.controller.js"

const router = express.Router()

const {getItineraries, getItineraryById, getItinerariesByCityId, createItinerary, updateItinerary, deleteItinerary} = itinerayController

router.get("/", getItineraries)

router.post("/", createItinerary)

router.get("/:id", getItineraryById);

router.get("/cities/:id", getItinerariesByCityId);

router.put("/:id", updateItinerary);

router.delete("/:id", deleteItinerary);

export default router