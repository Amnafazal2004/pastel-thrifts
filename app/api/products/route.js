import { ConnectDB } from "@/lib/config/db";
import ProductModel from "@/models/ProductModel";
import { writeFile } from 'fs/promises'
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
}
LoadDB();

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();
  const image = formData.get('image');
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`

  const productData = {
    username: `${formData.get("username")}`,
    productname: `${formData.get("productname")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    fortrade: `${formData.get("fortrade")}`,
    forbuy: `${formData.get("forbuy")}`,
    condition: `${formData.get("condition")}`,
    size: `${formData.get("size")}`,
    usagefrequency: `${formData.get("usagefrequency")}`,
    image: `${imgUrl}`,
    tradelocation: `${formData.get("tradelocation")}`,
    price: `${formData.get("price")}`,
  }

  await ProductModel.create(productData);
  console.log("saved");

  return NextResponse.json({ success: true, msg: "Product added" })
}

export async function GET(request) {
  
  const productid = request.nextUrl.searchParams.get("id");
  if(productid){
    const product = await ProductModel.findById(productid);
    return NextResponse.json(product)
  }
  else{
  const products = await ProductModel.find({});
  return NextResponse.json({ products })
  }

}