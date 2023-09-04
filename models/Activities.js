import {Schema, model, Types} from "mongoose";

let collection = "activities"

let schema = new Schema(
  {
    name: { type: String },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Activities = model(collection, schema)

export default Activities
