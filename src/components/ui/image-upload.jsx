"use client"

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const[mount, setmount] = useState(false);
  useEffect(() => {
    setmount(true);
  }, []);

  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };

  if (!mount) {
    return null;
  }
  return (
    <div>
      <div className="flex mb-4 items-center gap-4">
        {value.map((url) => (
          <div
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            key={url}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button variant='destructive' size='icon' type='button' onClick={()=>onRemove(url)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
            fill
            className="object-cover"
            alt="image"
            src={url}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="vyfck55z">
        {
            ({open})=>{
                const onClick=()=>{
                    open();
                }
                return(
                    <Button disabled={disabled} variant='secondary' type='button' onClick={onClick}>
                        <ImagePlus className="h-4 w-4 mr-2"/>
                        Upload an Image
                    </Button>
                )


            }



        }

      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
