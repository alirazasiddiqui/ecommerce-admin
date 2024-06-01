'use client'

 import { UseStoreModel } from "../../../../hooks/UseStore-modal"
import { useEffect } from "react";


//import { UserButton } from "@clerk/nextjs";
const SetUpPage = () => {

  

  


  const onOpen=UseStoreModel((sate)=>sate.onOpen);
  const isOpen=UseStoreModel((sate)=>sate.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen,onOpen])
  return     null;
  
}

export default SetUpPage