import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  productId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { productId } = params;
  const products = await prisma.product.findMany({
    skip: 4 * Number(productId),
    take: 5,
    include: {
      category: true,
      ProductDetail: true,
    },
  });
  return NextResponse.json(products);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { productId } = params;
  const products = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  return NextResponse.json(products);
}
