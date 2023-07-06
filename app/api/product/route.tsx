import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, image, description, categoryId } = body;
  const user = await prisma.product.create({
    data: {
      name,
      price,
      image,
      ProductDetail: {
        create: {
          description,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
    include: {
      ProductDetail: true,
      category: true,
    },
  });
  return NextResponse.json(user);
}
