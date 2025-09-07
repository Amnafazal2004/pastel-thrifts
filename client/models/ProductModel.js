import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user"
        //You're telling MongoDB: “This field (userId) is not just a string or ID — it references a document from the user collection.”
    },
     userName: {
        type: String,
        required: true,
        ref: "user"
        //You're telling MongoDB: “This field (userId) is not just a string or ID — it references a document from the user collection.”
    },
    productname: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    fortrade: {
        type: Boolean,

    },
    forbuy: {
        type: Boolean,

    },
    condition: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    usagefrequency: {
        type: String,
        required: true
    },
    tradelocation: {
        type: String,
    },
    price: {
        type: Number,
        required:true,
    },
    soldout: {
        type: Boolean,

    },
   
})

const ProductModel = mongoose.models.products || mongoose.model('products', Schema)

export default ProductModel;

