import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.category.findMany();
  return NextResponse.json(products);
}
