import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

const LoadDB = async () =>{
    await ConnectDB();
}
LoadDB();

export async function POST(request) {

   
    const formData = await request.formData();
    
    const userData = {
        username: `${formData.get("username")}`,
        email: `${formData.get("email")}`,
        password: `${formData.get("password")}`,
    }

    await UserModel.create(userData);
    console.log("saved");

    return NextResponse.json({success:true,msg:"User added"})

    
}

export async function GET(request) {
    
    //it will check in the url the values of username and password 
    const username = await request.nextUrl.searchParams.get("username");
    const password = await request.nextUrl.searchParams.get("password");
    const email = await request.nextUrl.searchParams.get("email");

    //it will see if those specific username and password are in database
    const user = await UserModel.findOne({username})
    const user2 = await UserModel.findOne({password})
    const user3 = await UserModel.findOne({email})
    
    if(email){
        if(user || user3){
            return NextResponse.json({success:false,msg:"username or email already exists"})
        }
        else{
             return NextResponse.json({success:true})
        }
    }
    else{
    if(!user && !user2){
        return NextResponse.json({success:false,msg:"Invalid credentials"})
    }
    else{
        return NextResponse.json({success:true,msg:"You have successfully logged in"})
    }

    }
}
