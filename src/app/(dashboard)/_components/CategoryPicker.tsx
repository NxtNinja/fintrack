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
import { FC, useState } from "react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPickerProps {
  type: TransactionType;
}

const CategoryPicker: FC<CategoryPickerProps> = ({ type }) => {
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
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search categories" />
          <CreateCategoryDialog type={type} />
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
                    key={category.userId}
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
