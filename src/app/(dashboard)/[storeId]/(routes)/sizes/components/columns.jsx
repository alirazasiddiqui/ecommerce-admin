"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

// Define the shape of our data
// You can use comments for documentation but no type annotations in JavaScript
// Use a Zod schema if needed in TypeScript, not applicable in JavaScript
export const BillBoardColumn = {
    id: "",
    name:"",
    value:"",
    createdAt:""
   
  };
  
  export const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
        id:'actions',
        cell:({row})=><CellAction data={row.original}/>
    }
    
  ];
  