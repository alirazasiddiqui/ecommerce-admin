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

const OrderClient = ({data}) => {
    
  return (
    <>
     
        <Heading
        title={`Orders (${data.length})`}
        description={'Manage orders for your Store'}
        />
       
      
      <Separator/>
      <DataTable searchKey={'products'} columns={columns} data={data}/>
      
    </>
  );
};

export default OrderClient;
