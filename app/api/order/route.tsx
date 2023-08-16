import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, delivery, products } = body;
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
  return NextResponse.json({});
}
