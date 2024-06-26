import { prismaDb } from "@/lib/prismaDb";

export const getTotalRevenue = async (storeId) => {
  const paidOrders = await prismaDb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const totalRevnue=paidOrders.reduce((total,order)=>{
    const orderTotal=order.orderItems.reduce((orderSum,item)=>{
        return orderSum+item.product.price.toNumber();
    },0)
    return total+orderTotal;
  },0)
  return totalRevnue;
};
