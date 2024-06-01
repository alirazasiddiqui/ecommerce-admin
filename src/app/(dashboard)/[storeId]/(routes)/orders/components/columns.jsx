"use client"

import { ColumnDef } from "@tanstack/react-table"

// Define the shape of our data
// You can use comments for documentation but no type annotations in JavaScript
// Use a Zod schema if needed in TypeScript, not applicable in JavaScript
export const OrderColumn = {
    id: "",
    label:"",
    createdAt:""
   
  };
  
  export const columns = [
    {
      accessorKey: "products",
      header: "Products",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "isPaid",
      header: "Paid",
    },

    {
      accessorKey: "createdAt",
      header: "Date",
    },
    
  ];
  