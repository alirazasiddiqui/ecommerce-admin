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

const BillboardClient = ({data}) => {
    const router=useRouter();
    const params=useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        title={`Billboards (${data.length})`}
        description={'Manage billboards for your Store'}
        />
        <Button onClick={()=> router.push(`/${params.storeId}/billboard/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey={'label'} columns={columns} data={data}/>
      <Heading title={'API'} description={'API calls for Billboard'} />
      <Separator/>
      <APIList entityName={'billboard'} entityIdName={'billboardId'} />

    </>
  );
};

export default BillboardClient;
