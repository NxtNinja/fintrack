"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { PopoverContent } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { FC, useCallback, useEffect, useState } from "react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPickerProps {
  type: TransactionType;
  onChange: (value: string) => void;
}

const CategoryPicker: FC<CategoryPickerProps> = ({ type, onChange }) => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = data?.find(
    (category: Category) => category.name === value
  );

  const onSuccessCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );

  useEffect(() => {
    if (!value) {
      return;
    }

    onChange(value);
  }, [onChange, value]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between flex"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search categories" />

          {/* Create category */}
          <CreateCategoryDialog
            type={type}
            successCallback={onSuccessCallback}
          />
          <CommandEmpty>
            <p className="">No categories found</p>
            <p className="text-xs text-muted-foreground">
              Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data &&
                data?.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0",
                        value === category.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPicker;

const CategoryRow = ({ category }: { category: Category }) => {
  return (
    <div className="">
      <span className="" role="img">
        {category.icon}
      </span>
      <span>{category.name}</span>
    </div>
  );
};
