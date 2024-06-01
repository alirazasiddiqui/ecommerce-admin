"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BillBoardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/models/alert-modal";
import { useState } from "react";


const CellAction = ({ data }) => {
    
const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);
    const router=useRouter();
    const params=useParams();
   
    const onCopy=(id)=>{
        navigator.clipboard.writeText(id);
        toast.success('Size Id copied to clipboard')
    }
    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(
            `/api/${params.storeId}/sizes/${data.id}`
          );
          router.refresh();
          toast.success("Size deleted");
        } catch (error) {
          toast.error("Make sure removed all products using this size");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };
  return (
    <>
    <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />

      
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className="sr-only"> Open Menu</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={()=>onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4"/>
            Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/sizes/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Delete className="mr-2 h-4 w-4"/>
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    
    </>
  );
};

export default CellAction;
