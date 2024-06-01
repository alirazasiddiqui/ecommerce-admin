import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { prismaDb } from "@/lib/prismaDb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
import React from "react";
import { getTotalRevenue } from "../../../../../actions/get-tottal-revenue";
import { getSaleCount } from "../../../../../actions/get-sale-count";
import { getStock } from "../../../../../actions/get-stock-count";
import OverView from "@/components/overview";
import { getGraphRevnue } from "../../../../../actions/get-graph-revnue";

const Dashobaord = async ({ params }) => {
  const totalRevnue=await getTotalRevenue(params.storeId);
  const saleCount=await getSaleCount(params.storeId);
  const stockCount=await getStock(params.storeId);
  const graphRevenue=await getGraphRevnue(params.storeId);
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={"Dashboard"} description={"Overview of Store"} />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevnue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{saleCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Items in Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>
              OverView
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <OverView data={graphRevenue}/>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default Dashobaord;
