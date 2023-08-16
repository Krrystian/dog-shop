import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  userId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;
  const products = await prisma.orderHeader.findMany({
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
