
import connectDB from "@/config/db";
import UserModel from "@/models/UserModel";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const LoadDB = async () =>{
//     await ConnectDB();
// }
// LoadDB();

// export async function POST(request) {

   
//     const formData = await request.formData();
    
//     const userData = {
//         username: `${formData.get("username")}`,
//         email: `${formData.get("email")}`,
//         password: `${formData.get("password")}`,
//     }

//     await UserModel.create(userData);
//     console.log("saved");

//     return NextResponse.json({success:true,msg:"User added"})

    
// }

// export async function GET(request) {
    
//     //it will check in the url the values of username and password 
//     const username = await request.nextUrl.searchParams.get("username");
//     const password = await request.nextUrl.searchParams.get("password");
//     const email = await request.nextUrl.searchParams.get("email");

//     //it will see if those specific username and password are in database
//     const user = await UserModel.findOne({username})
//     const user2 = await UserModel.findOne({password})
//     const user3 = await UserModel.findOne({email})
    
//     if(email){
//         if(user || user3){
//             return NextResponse.json({success:false,msg:"username or email already exists"})
//         }
//         else{
//              return NextResponse.json({success:true})
//         }
//     }
//     else{
//     if(!user && !user2){
//         return NextResponse.json({success:false,msg:"Invalid credentials"})
//     }
//     else{
//         return NextResponse.json({success:true,msg:"You have successfully logged in"})
//     }

//     }
// }

export async function GET(request) {


    try{
 const {userId} = getAuth(request)
    await connectDB()
    const user = await UserModel.findById(userId)

    if(!user){
        return NextResponse.json({success:false,message:"user not found"})

    }
    else{
        return NextResponse.json({success:true,user})
    }
    }
    catch(error){
         return NextResponse.json({success:false,message:message.error})
    }
    }
   
//jb bhi koi user data lena chahye ga apna then, getauth se user id miljayegi us hi id se 
//user ko dhoondaingy agar nhi hai user too usernot found werna user ki details de dega 


// User->>Clerk: Signs up / logs in
//   Clerk->>Inngest: Sends user.created event
//   Inngest->>MongoDB: Creates user (_id = Clerk userId)
//   User->>Next.js API: Requests /api/cart
//   Next.js API->>Clerk: getAuth(req)
//   Next.js API->>MongoDB: findById(userId)
//   MongoDB-->>Next.js API: user data
//   Next.js API-->>User: cart, profile etc.