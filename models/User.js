import { Schema, model, Types } from "mongoose";

let collection = "users";

let schema = new Schema({
    user: {type: String, require:true},
    image: {type: String},
    profile: {
        bio: {type: String}
    }
},
{
    timestamps: true,
})

let User = model(collection, schema)

export default User