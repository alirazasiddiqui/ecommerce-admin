"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

// Define the shape of our data
// You can use comments for documentation but no type annotations in JavaScript
// Use a Zod schema if needed in TypeScript, not applicable in JavaScript
export const ColorColumn = {
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
      cell:({row})=>(
        <div className="flex items-center gap-x-2">
          {row.original.value}

          <div className="h-6 w-6 rounded-full border"
          style={{backgroundColor:row.original.value}}/>
        </div>
      )
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
  