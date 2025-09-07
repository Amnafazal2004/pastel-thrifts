// import { ConnectDB } from "@/lib/config/db";
// import ProductModel from "@/models/ProductModel";
// import { writeFile } from 'fs/promises'
// import { NextResponse } from "next/server";

// const LoadDB = async () => {
//   await ConnectDB();
// }
// LoadDB();

// export async function POST(request) {
//   const formData = await request.formData();
//   const timestamp = Date.now();
//   const image = formData.get('image');
//   const imageByteData = await image.arrayBuffer();
//   const buffer = Buffer.from(imageByteData);
//   const path = `./public/${timestamp}_${image.name}`;
//   await writeFile(path, buffer);
//   const imgUrl = `/${timestamp}_${image.name}`

//   const productData = {
//     username: `${formData.get("username")}`,
//     productname: `${formData.get("productname")}`,
//     description: `${formData.get("description")}`,
//     category: `${formData.get("category")}`,
//     fortrade: `${formData.get("fortrade")}`,
//     forbuy: `${formData.get("forbuy")}`,
//     condition: `${formData.get("condition")}`,
//     size: `${formData.get("size")}`,
//     usagefrequency: `${formData.get("usagefrequency")}`,
//     image: `${imgUrl}`,
//     tradelocation: `${formData.get("tradelocation")}`,
//     price: `${formData.get("price")}`,
//   }

//   await ProductModel.create(productData);
//   console.log("saved");

//   return NextResponse.json({ success: true, msg: "Product added" })
// }

// export async function GET(request) {

//   const productid = request.nextUrl.searchParams.get("id");
//   if(productid){
//     const product = await ProductModel.findById(productid);
//     return NextResponse.json(product)
//   }
//   else{
//   const products = await ProductModel.find({});
//   return NextResponse.json({ products })
//   }

// }

import connectDB from "@/config/db"
import ProductModel from "@/models/ProductModel"
import { getAuth } from "@clerk/nextjs/server"
import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"


//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

export async function POST(request) {
  console.log('API route hit');
  try {
    //it gets the id of someone who is currently logged in
    const { userId } = getAuth(request)
    console.log('User ID:', userId);
    //u need to do this if u want to specify that only sellers can add the product
    //what it does is that through the userid it goes to auth seller file
    //where it sees whether the user is seller if it is then it continue
    //otherwise it says not authorized
    // const isSeller = await authSeller(userId)

    // if(!isSeller){
    //   return NextResponse.json({success:false,message:"not authorized"})
    // }

    const formData = await request.formData()
    console.log('Form data received');

    const userName = formData.get("userName")
    console.log(userName)
    const productname = formData.get("productname")
       
    const description = formData.get("description")
    const category = formData.get("category")
    const fortrade = formData.get("fortrade")
    const forbuy = formData.get("forbuy")
    const condition = formData.get("condition")
    const size = formData.get("size")
    const usagefrequency = formData.get("usagefrequency")
    const files = formData.getAll('images')
    const tradelocation = formData.get("tradelocation")
    const price = formData.get("price")
    const soldout = formData.get("soldout")



    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "image not uploaded" })
    }

    //to upload files on cloudinary
    //the promise is used for asynchronous functions where they have to wait for something
    //here it waits for all the files to be uploaded and then create an array which goes into result
    const result = await Promise.all(
      //it goes through every file and sync it
      files.map(async (file) => {
        //then change into binary format
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        //a promise either returns resolve or reject 
        //so if a file is uploaded it says resolve else reject
        //and then does it for every file in array
        return new Promise((resolve, reject) => {

          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error)
              }
              else {
                resolve(result)
              }
            }
          )
          stream.end(buffer)

        })
      })
    )

    //extract the image url from result promise
    const image = result.map(result => result.secure_url)

    //save data in database
    await connectDB()
    const newProduct = await ProductModel.create({
      userId,userName, productname, description, category,
      condition, size, usagefrequency, image, tradelocation,
      //jb formdata se ayega to wo string main change hojayega
      //isliye wapis actual datatype main change kareyingy
      //       // When checkbox is CHECKED (true):
      // // Frontend sends: productdata.fortrade = true
      // // FormData converts to: "true" (string)
      // formData.get("fortrade")           // Returns: "true"
      // formData.get("fortrade") === 'true' // Returns: true 

      // // When checkbox is UNCHECKED (false):
      // // Frontend sends: productdata.fortrade = false  
      // // FormData converts to: "false" (string)
      // formData.get("fortrade")           // Returns: "false"
      // formData.get("fortrade") === 'true' // Returns: false 
      fortrade: formData.get("fortrade") === 'true',
      forbuy: formData.get("forbuy") === 'true',
      price: Number(price),
      soldout: formData.get("soldout") === 'true',

    })
    console.log(newProduct)
    return NextResponse.json({ success: true, message: "product added", newProduct })
  }
  catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }

}

