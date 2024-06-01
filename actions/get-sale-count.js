import { prismaDb } from "@/lib/prismaDb";

export const getSaleCount = async (storeId) => {
  const sales = await prismaDb.order.count({
    where: {
      storeId,
      isPaid: true,
    }
  });
  return sales;
  
};
