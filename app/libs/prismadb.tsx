import { PrismaClient } from "@prisma/client";
//HOT RELOAD fix
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
export default client;
