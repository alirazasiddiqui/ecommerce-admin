"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import ApiAlert from "@/components/ui/api-alert";
import APIList from "@/components/ui/api-list";

const ProductClient = ({data}) => {
    const router=useRouter();
    const params=useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        title={`Products (${data.length})`}
        description={'Manage products for your Store'}
        />
        <Button onClick={()=> router.push(`/${params.storeId}/products/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey={'name'} columns={columns} data={data}/>
      <Heading title={'API'} description={'API calls for products'} />
      <Separator/>
      <APIList entityName={'products'} entityIdName={'productId'} />

    </>
  );
};

export default ProductClient;
