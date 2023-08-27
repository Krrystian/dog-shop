import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, delivery, products } = body;
  const zipCodeRegEx = /^\d{5}$|^\d{2}-\d{3}$/;
  const houseNumberRegEx = /^\d+$/;
  if (!delivery.zipCode.match(zipCodeRegEx)) {
    return NextResponse.json(
      { message: "Wrong zipCode format, 6-digits or ex. 000-000" },
      { status: 400 }
    );
  } else if (!delivery.houseNumber.match(houseNumberRegEx)) {
    return NextResponse.json(
      { message: "Wrong house number, must be a number!" },
      { status: 400 }
    );
  }
  const orderHeader = await prisma.orderHeader.create({
    data: {
      deliveryPlace: {
        create: {
          country: delivery.country,
          city: delivery.city,
          zipCode: delivery.zipCode,
          street: delivery.street,
          houseNumber: delivery.houseNumber,
        },
      },
      User: {
        connect: { id: userId },
      },
      orderDetail: {
        create: products.map((product: any) => ({
          Product: {
            connect: { id: product.id },
          },
          quantity: product.quantity,
          transactionPrice: product.quantity * product.price,
        })),
      },
    },
    include: {
      orderDetail: true,
      User: true,
      deliveryPlace: true,
    },
  });
  return NextResponse.json(orderHeader);
}
