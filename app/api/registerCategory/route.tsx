import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;
  const product = await prisma.category.create({
    data: {
      name,
    },
  });
  return NextResponse.json(product);
}
