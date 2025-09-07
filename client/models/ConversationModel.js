import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
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
    recieverName: {
        type: String,
        required: true,
        ref: "user"
        //You're telling MongoDB: “This field (userId) is not just a string or ID — it references a document from the user collection.”
    },
    productId: {
        type: String,
        required: true,
        ref: "product",
    },

    recieverId: {
        type: String,
        required: true,
        ref: "product"
    },
    messages: {
        type: Array,
    },
   
   
   
})

const ConversationModel = mongoose.models.conversation || mongoose.model('conversation', Schema)

export default ConversationModel;
