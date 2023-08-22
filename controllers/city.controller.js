import City from "../models/City.js";


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
      const cities = await City.find(queries);
      if (cities.length > 0) {
        return res.status(200).json({
          success: true,
          cities,
        });
      }
      return res.status(404).json({
        success: false,
        cities: "No se encontraron cities",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: true,
        message: "Error al obterner las cities",
      });
    }
  },

  getCityById: async (req, res) => {
    try {
      const oneCity = await City.findById(req.params.id);
      if (oneCity) {
        return res.status(200).json({
          success: true,
          oneCity,
        });
      }
      return res.status(404).json({
        success: false,
        message: "No se encuentra la city",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener la city",
      });
    }
  },

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
        message: "Error al crear la city",
      });
    }
  },

  updateCity: async (req, res) => {
    try {
      await City.updateOne({_id: req.params.id}, req.body)
      //updateOne: actualiza el elemento directamente
      
      return res.status(200).json({
        success: true,
        message: "City update",
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar la city",
      });
      
    }
  },

  deleteCity: async (req, res) => {
    try {
      await City.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "City delete",
      });
      
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error al eliminar la city",
      });
      
    }
  },
}

export default controller