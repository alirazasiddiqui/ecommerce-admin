"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseStoreModel } from "../../hooks/UseStore-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsDownUp, PlusCircle, StoreIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { cn } from "@/lib/utils";

const NavSwitcher = ({ items }) => {
  const storeModel = UseStoreModel();
  const params = useParams();
  const router = useRouter();
  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  //console.log('formatteditems', formatedItems)

  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  );
  //console.log('currentStore', currentStore.value)

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsDownUp className="ml-auto h-4 w-4  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-8">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formatedItems.map((store) => (
                
                <CommandItem
                className="text-sm"
                key={store.value}
                onSelect={() => {onStoreSelect(store)}} // Corrected prop name to onSelect
              >
              
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                    
                  setOpen(false);
                  storeModel.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default NavSwitcher;
