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

const CategoriesClient = ({data}) => {
    const router=useRouter();
    const params=useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        title={`Categories (${data.length})`}
        description={'Manage categories for your Store'}
        />
        <Button onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
            <Plus className="h-4 w-4 mr-2"/>
            Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey={'name'} columns={columns} data={data}/>
      <Heading title={'API'} description={'API calls for Categories'} />
      <Separator/>
      <APIList entityName={'categories'} entityIdName={'categoryId'} />

    </>
  );
};

export default CategoriesClient;
