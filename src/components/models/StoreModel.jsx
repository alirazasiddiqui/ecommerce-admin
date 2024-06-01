"use client";
import React, { useState } from "react";
import { UseStoreModel } from "../../../hooks/UseStore-modal";
import Modal from "../ui/Modal";
import { Button } from "@/components/ui/button";
import {toast} from 'react-hot-toast'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
const StoreModel = () => {
  const [loading, setLoading] = useState(false);
  const storeModel = UseStoreModel();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (value) => {
    try {
      setLoading(true);
      const response=await axios.post("/api/stores", value);
      window.location.assign(`/${response.data.id}`)


     // toast.success("Store created successfully")
      //console.log(response.data)
      form.reset();
    } catch (err) {
      console.log(err.response);
      toast.error("Internal error")
    } finally {
      setLoading(false);
    }

    
  };
  return (
    <>
      <Modal
        title="Create Store"
        description="Add a new store to manage products and categories."
        isOpen={storeModel.isOpen}
        onClose={storeModel.onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-commerce"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModel.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StoreModel;
