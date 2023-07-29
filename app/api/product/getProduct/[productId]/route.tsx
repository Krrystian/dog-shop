import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  productId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  const { productId } = params;
  const products = await prisma.product.findMany({
    skip: 4 * Number(productId),
    take: 9,
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

  const productUpdate = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      category: {
        set: [],
      },
    },
    include: {
      category: true,
    },
  });
  const products = await prisma.product.delete({
    where: {
      id: productId,
    },
    include: { category: true },
  });
  return NextResponse.json({});
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { productId } = params;
  const body = await request.json();
  const {
    name,
    price,
    image,
    description,
    categoryId,
    productDetailId,
    categoryId2,
  } = body;
  if (categoryId2 === "" || categoryId2 === undefined) {
    const productUpdate = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name,
        price: price,
        image: image,
        ProductDetail: {
          update: {
            where: {
              id: productDetailId,
            },
            data: {
              description: description,
            },
          },
        },
        category: {
          set: [],
          connect: [
            {
              id: categoryId,
            },
          ],
        },
      },
      include: {
        category: true,
        ProductDetail: true,
      },
    });
  } else {
    const productUpdate = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name,
        price: price,
        image: image,
        ProductDetail: {
          update: {
            where: {
              id: productDetailId,
            },
            data: {
              description: description,
            },
          },
        },
        category: {
          set: [],
          connect: [
            {
              id: categoryId,
            },
            {
              id: categoryId2,
            },
          ],
        },
      },
      include: {
        category: true,
        ProductDetail: true,
      },
    });
  }
  return NextResponse.json({});
}
