import Itinerary from "../models/Itinerary.js"
import City from "../models/City.js";

const controller = {
    getItineraries: async(req,res)=>{
        let queries = {}
        try {
            const itineraries = await Itinerary.find(queries).populate("user")
            return res.status(200).json({
                success:true,
                itineraries,
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Itinerary not found"
            })
            
        }
    },

    getItinerariesByCityId: async (req,res)=>{
        try {
          const oneCity = await City.findById(req.params.id)
            .populate("itinerary")
          const itinerariesXCity = oneCity.itinerary

          if (oneCity) {
            return res.status(200).json({
              success: true,
              itinerariesXCity,
            });
          }
          return res.status(404).json({
            success: false,
            message: "City not found",
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to get itinerarios by city",
          });
        }
    },

    getItineraryById: async (req,res)=>{
        try {
           const oneItinerary = await Itinerary.findById(req.params.id)
            return res.status(200).json({
                success: true,
                oneItinerary,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get the itinerary"
            })
        }
    },

    createItinerary: async (req, res)=>{
        try {
            await Itinerary.create(req.body)
            return res.status(200).json({
                success:true,
                message: "Itineray created"
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Failed to create itinerary"
            })            
        }
    },

    updateItinerary: async (req, res) => {
        try {
            await Itinerary.updateOne({ _id: req.params.id }, req.body)
            return res.status(200).json({
                success:true,
                message: "Itinerary updated"
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Failed to update the itinerary"
            })
        }
    },

    deleteItinerary: async (req,res)=>{
        try {
            await Itinerary.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success:true,
                message: "Itinerary deleted"
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: "Failed to delete the itinerary"
            })
        }
    }
}

export default controller