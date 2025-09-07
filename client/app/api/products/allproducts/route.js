import connectDB from "@/config/db";
import ProductModel from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  const productid = request.nextUrl.searchParams.get("id");
  if (productid) {
    const product = await ProductModel.findById(productid);
    return NextResponse.json(product)
  }
  else {
    const products = await ProductModel.find({});
    return NextResponse.json({ products }) 
  } 
}

export async function PUT(request) {
  await connectDB()

  const {id,soldout} = await request.json();
  
  const product = await ProductModel.findByIdAndUpdate(
    id,
     { soldout: Boolean(soldout) },  //to push in an array
    { new: true }  //returns the updated document
  );

  return NextResponse.json(product);
  
}

export async function DELETE(request) {
  await connectDB()

  const {id} = await request.json()
  await ProductModel.findByIdAndDelete(
    id
  )
  return NextResponse.json({msg:"product deleted"})
  
}