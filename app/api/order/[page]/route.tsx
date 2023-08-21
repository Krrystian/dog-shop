import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  page?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { page } = params;
  const products = await prisma.orderHeader.findMany({
    take: 6,
    skip: 5 * Number(page),
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
      createdAt: "desc",
    },
  });
  return NextResponse.json(products);
}
