import mongoose, { Schema, model,models } from "mongoose";

const ProductSchema = new Schema({
  productName: String,
  description: String,
  price: { type: Number, required: true },
  productImages:[{type:String}],
  category:{type:mongoose.Types.ObjectId,ref:'Catagory'},
  properties:{type:Object},
},{
  timestamps:true,
});

export const product = models.products || model("products",ProductSchema);
