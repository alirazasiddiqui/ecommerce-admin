import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import toast from 'react-hot-toast';

const textMap = {
    public:'public',
    admin:'admin',
}
const variantMap = {
    public:'secondary',
    admin:'destructive',
}

const ApiAlert = (props) => {
    const {title,description,variant='public'}=props;
    const onCopy=()=>{
        navigator.clipboard.writeText(description);
        toast.success('API_ROUTE copied to clipboard')
    }

  return (
    <Alert>
        <Server className='h-4 w-4'/>
        <AlertTitle className='flex items-center gap-x-2'>
            {title}
            <Badge variant={variantMap[variant]} >{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className='mt-4 flex items-center justify-between'>
            <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                {description}
            </code>
            <Button variant='outline' size='icon' onClick={()=>{
                onCopy()

            }}>
                <Copy className='h-4 w-4'/>
            </Button>
        </AlertDescription>


    </Alert>
  )
}

export default ApiAlert