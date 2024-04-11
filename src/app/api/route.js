import { product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";


export const GET=async(req,res)=>{
    try{
        await mongooseConnect();
        const {searchParams}=new URL(req.url);
        const id=searchParams.get('id');
        if(id){
            const productById = await product.findById(id);
            return new NextResponse(JSON.stringify(productById), { status: 200 });
        }else{
            const products=await product.find({},null,{sort:{'_id':-1},limit:10});
            return new NextResponse(JSON.stringify(products),{status:200});
        }
    }
    catch(error){
        return new NextResponse("Error in fetching products"+error,{status:500});
    }
}
