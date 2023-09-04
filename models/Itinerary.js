import { Schema, model, Types } from "mongoose";

let collection = "itineraries";

let schema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "users" },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    duration: { type: String, require: true },
    likes: { type: Number },
    hashtags: { type: String, require: true },
    comments: { type: String },    
  },
  {
    timestamps: true,
  }
);

const Itinerary = model(collection, schema);

export default Itinerary