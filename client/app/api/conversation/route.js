
import connectDB from "@/config/db"
import ConversationModel from "@/models/ConversationModel"
import { NextResponse } from "next/server"

export async function POST(request) {
    try{
      
    const formData = await request.formData()
    console.log('Form data received');

    const _id=formData.get("_id") 
    const userId = formData.get("userId")
    const userName = formData.get("userName")
    const productId = formData.get("productId")
    const recieverId = formData.get("recieverId")
    const recieverName = formData.get("recieverName");
    const messages = formData.getAll('messages')

    await connectDB()
    const newConversation = await ConversationModel.create({
       _id,userId,userName,productId,recieverId,recieverName,messages
    })
      console.log(newConversation)
        return NextResponse.json({ success: true, message: "conversation added" })
      }
      catch (error) {
        return NextResponse.json({ success: false, message: error.message })
      }

    }

export async function GET(request) {
  await connectDB();

  const conversationId = request.nextUrl.searchParams.get("id");

  if(conversationId){
      const conversation = await ConversationModel.findOne({_id: conversationId});
    return NextResponse.json({conversation})  
    //idher ye {conversation} is liye kia kyun k ye get request [id] main hi use horahi jahan conversation id true ayega everytime 
    //so agar frontend per hum sirf data se access kareyingy to ye wala dega

  }
  else{
      const conversations = await ConversationModel.find({});
        return NextResponse.json({ conversations }) 
        //if data.conversations likheingy to ye wala
  }
  


}

export async function PUT(request) {
  await connectDB();

  const { id, message } = await request.json();

  const conversation = await ConversationModel.findByIdAndUpdate(
    id,
    { $push: { messages: message } },  //to push in an array
    { new: true }
  );

  return NextResponse.json(conversation);
}
