import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  productId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { productId } = params;
  const products = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      ProductDetail: true,
    },
  });
  return NextResponse.json(products);
}
