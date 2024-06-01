'use client'

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";

const AlertModal = (props) => {
    const {isOpen,onClose,onConfirm,loading}=props;
    const [isMounted,setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true);
    },[])
    if(!isMounted){
        return null;
    }


  return (
    <Modal
    title='Are you sure?'
    description='This action can not be undone.'
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    
    >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant='outline' onClick={onClose}>Cancel</Button>
            <Button disabled={loading} variant='destructive' onClick={onConfirm}>Continue</Button>

        </div>


    </Modal>
  )
}

export default AlertModal