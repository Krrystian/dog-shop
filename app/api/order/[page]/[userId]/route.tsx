import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  page?: string;
  userId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId, page } = params;
  const products = await prisma.orderHeader.findMany({
    take: 6,
    skip: 6 * Number(page),
    where: {
      userId: userId,
    },
    include: {
      deliveryPlace: true,
      orderDetail: {
        include: {
          Product: { select: { name: true } },
        },
      },
      User: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return NextResponse.json(products);
}
