"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {UseOrigin} from '../../../../../../../hooks/use-origin'
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/models/alert-modal";
import ApiAlert from "@/components/ui/api-alert";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});
const SettingForm = ({ initialData }) => {
  const params=useParams();
  const router=useRouter();
  const origin=UseOrigin();
  const[loading,setLoading]=useState(false);
  const[open,setOpen]=useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
     
    
  });

  const onSubmit=async (values)=> {
    //console.log(values);
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`,values);
      router.refresh();
      toast.success("Store updated successfully");


    } catch (error) {
      toast.error("Something went wrong")

      
    }
    finally{
      setLoading(false)
    }


  }
  const onDelete=async ()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted')
    } catch (error) {
      toast.error("Make sure removed all products and categories")
      
    }finally{
      setLoading(false)
      setOpen(false)
    }



  }
  return (
    <>
    <AlertModal
     isOpen={open} 
     onClose={()=>setOpen(false)} 
     onConfirm={()=>{onDelete()} }
     loading={loading}
     />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />

        <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className='ml-auto' disabled={loading} type="submit">Save changes</Button>
        </form>
      </Form>

      <Separator/>
      <ApiAlert title={'NEXT_PUBLIC_API_URL'} description={`${origin}/api/${params.storeId}`}/>
    </>
  );
};

export default SettingForm;
