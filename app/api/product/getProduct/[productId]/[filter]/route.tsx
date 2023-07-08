import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
interface IParams {
  productId?: string;
  filter?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { productId, filter } = params;
  const searchQuery: Prisma.ProductWhereInput = {
    OR: [
      {
        name: {
          contains: filter,
          mode: "insensitive",
        },
      },
      {
        category: {
          some: {
            name: {
              contains: filter,
              mode: "insensitive",
            },
          },
        },
      },
    ],
  };
  const products = await prisma.product.findMany({
    skip: 4 * Number(productId),
    take: 5,
    where: searchQuery,
    include: {
      category: true,
      ProductDetail: true,
    },
  });
  return NextResponse.json(products);
}
