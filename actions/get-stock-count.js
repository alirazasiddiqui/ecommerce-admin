import { prismaDb } from "@/lib/prismaDb";

export const getStock = async (storeId) => {
  const stock = await prismaDb.product.count({
    where: {
      storeId,
      isArchived:false,
    }
  });
  return stock;
  
};
