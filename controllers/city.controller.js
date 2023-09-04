import City from "../models/City.js";
import Itinerary from "../models/Itinerary.js";

const controller = {
  getCities: async (req, res) => {
    let queries = {};
    if (req.query.name) {
      queries.name = new RegExp(`^${req.query.name}`, "i");
    }

    if (req.query.language) {
      queries.language = req.query.language;
    }

    try {
      //find() de mongoose, busca los elementos
      const cities = await City.find(queries).populate("itinerary");
    
      if (cities.length > 0) {
        return res.status(200).json({
          success: true,
          cities,
        });
      }
      return res.status(404).json({
        success: false,
        cities: "Cities not found",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: true,
        message: "Failed to get the cities",
      });
    }
  },

  getCityById: async (req, res) => {
    try {
      const oneCity = await City.findById(req.params.id).populate({
        path: "itinerary",
        populate: {
          path: "user",
        },
      });
      
      if (oneCity) {
        return res.status(200).json({
          success: true,
          oneCity,
        });
      }
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to get city",
      });
    }
  },

/*   getItinerariesByCity: async (id, res)=>{
    try {
      
      return itineraries;
    } catch (error) {
       console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to create the city",
    })}
  
},    */

  createCity: async (req, res) => {
    try {
      const newCity = City.create(req.body);
      return res.status(201).json({
        success: true,
        message: "City created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to create the city",
      });
    }
  },

  updateCity: async (req, res) => {
    try {
      await City.updateOne({_id: req.params.id}, req.body)
      //updateOne: actualiza el elemento directamente
      
      return res.status(200).json({
        success: true,
        message: "City updated",
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to update the city",
      });
      
    }
  },

  deleteCity: async (req, res) => {
    try {
      await City.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "City deleted",
      });
      
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete the city",
      });
      
    }
  },
}

export default controller