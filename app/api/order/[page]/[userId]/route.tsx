import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  page?: string;
  userId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId, page } = params;
  const products = await prisma.orderHeader.findMany({
    take: 9,
    skip: 9 * Number(page),
    where: {
      userId: userId,
    },
    include: {
      deliveryPlace: true,
      orderDetail: true,
    },
  });
  return NextResponse.json(products);
}
