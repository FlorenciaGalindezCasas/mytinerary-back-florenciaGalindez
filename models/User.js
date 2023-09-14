import { Schema, model, Types } from "mongoose";

let collection = "users";

let schema = new Schema(
  {
    user: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    image: { type: String, require: true },
    google: { type: Boolean, default: false }, 
    online: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String},
  },
  {
    timestamps: true,
  }
);

let User = model(collection, schema)

export default User