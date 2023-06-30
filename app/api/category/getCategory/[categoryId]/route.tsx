import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  categoryId?: String;
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
