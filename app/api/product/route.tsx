import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, image, description, categoryId, categoryId2 } = body;
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
        connect: [
          {
            id: categoryId,
          },
          {
            id: categoryId2,
          },
        ],
      },
    },
    include: {
      ProductDetail: true,
      category: true,
    },
  });
  return NextResponse.json(user);
}
