import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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
        type: String,
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
})

const ProductModel = mongoose.models.products || mongoose.model('products', Schema)

export default ProductModel;

