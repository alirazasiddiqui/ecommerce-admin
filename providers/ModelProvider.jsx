"use client";
import StoreModel from "@/components/models/StoreModel";
import { useState, useEffect } from "react";

const ModelProvider = () => {
  const [mount, setmount] = useState(false);
  useEffect(() => {
    setmount(true);
  }, []);
  if (!mount) {
    return null;
  }
  return (
    <div>
      <StoreModel />
    </div>
  );
};

export default ModelProvider;
