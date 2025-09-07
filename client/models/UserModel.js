import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique: true
    },

    email:{
        type:String,
        required:true,
        unique: true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    cartitems:{
        type:Object,
        default:{}

    }
},{minimize:false})
//minimize false so if a object is empty it still add it in database
//otherwise by default if a object is empty it will not add it in database


const UserModel = mongoose.models.user || mongoose.model('user', Schema)

export default UserModel;