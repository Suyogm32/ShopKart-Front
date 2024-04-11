import { product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { Cursor } from "mongoose";
import { Order } from "@/models/Order";
import { metadata } from "@/app/layout";
const stripe = require("stripe")(process.env.STRIPE_SK);
export const POST = async (req, res) => {
  try {
    await mongooseConnect();
    const data = await req.json(); // req.body should now contain parsed JSON data
    console.log("data->", data);
    const { Name, Email, Address, City, Postalcode, State, Country, products } =
      data;
    const uniqueIds = [...new Set(products)];
    const productsInfo = await product.find({ _id: { $in: uniqueIds } });
    let line_items = [];
    uniqueIds.forEach((productId) => {
      const info = productsInfo.find((p) => p._id.toString() === productId);
      const quantity = products.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && info) {
        line_items.push({
          quantity,
          price_data: {
            currency: "inr",
            product_data: { name: info.productName },
            unit_amount: quantity * info.price*100,
          },
        });
      }
    });
    console.log(line_items);
    const orderData = {
      line_items,
      Name,
      Email,
      Address,
      City,
      Postalcode,
      State,
      Country,
      paid: false,
    };
    const currentOrder = new Order(orderData);
    await currentOrder.save();

    const paymentsession=await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        customer_email:Email,
        success_url:process.env.SUCCESS_URL+'cart?success=1',
        cancel_url:process.env.SUCCESS_URL+'cart?canceled=1',
        metadata:{orderId:currentOrder._id.toString()}
    });

    console.log(paymentsession);

    return new NextResponse(
      JSON.stringify({url: paymentsession.url, currentOrder }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Error in fetching products" + error, {
      status: 500,
    });
  }
};
