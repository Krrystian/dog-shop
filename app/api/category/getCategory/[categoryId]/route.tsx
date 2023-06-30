import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  categoryId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { categoryId } = params;
  if (!categoryId || typeof categoryId !== "string") {
    throw new Error("Invalid ID");
  }
  const categoryDel = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return NextResponse.json(categoryDel);
}
export async function POST(request: Request, { params }: { params: IParams }) {
  const { categoryId } = params;
  const body = await request.json();
  const { name } = body;
  const categoryUpdate = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: name,
    },
  });
  return NextResponse.json(categoryUpdate);
}
