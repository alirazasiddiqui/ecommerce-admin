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

const SizeClient = ({data}) => {
    const router=useRouter();
    const params=useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        title={`Sizes (${data.length})`}
        description={'Manage sizes for your Store'}
        />
        <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey={'name'} columns={columns} data={data}/>
      <Heading title={'API'} description={'API calls for Sizes'} />
      <Separator/>
      <APIList entityName={'sizes'} entityIdName={'sizeId'} />

    </>
  );
};

export default SizeClient;
