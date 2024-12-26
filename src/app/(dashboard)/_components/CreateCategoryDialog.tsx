"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schemas/categories";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusSquareIcon } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateCategory } from "../_actions/categories";
import { Category } from "@prisma/client";
import { toast } from "sonner";

interface CreateCategoryDialogProps {
  type: TransactionType;
}

const CreateCategoryDialog: FC<CreateCategoryDialogProps> = ({ type }) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type,
      });

      toast.success(`Category ${data.name} created successfully 🎉`, {
        id: "create-category",
      });

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpen((prev) => !prev);
    },
    onError: (error) => {
      toast.error(`Error creating category: ${error.message}`, {
        id: "create-category",
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateCategorySchemaType) => {
      toast.loading("Creating category...", {
        id: "create-category",
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="flex border-separate items-center justify-start rounded-none border-b p-3 text-muted-foreground"
          >
            <PlusSquareIcon className="mr-2 h-4 w-4" />
            Create a new category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create a new{" "}
              <span
                className={cn(
                  type === "income" ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {type}
              </span>{" "}
              category
            </DialogTitle>
            <DialogDescription>
              Categories are used to group transactions together. You can create
              as many categories as you want.
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>
                        Transaction Description (optional){" "}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="h-[100px] w-full"
                            >
                              {form.watch("icon") ? (
                                <div className="flex flex-col items-center gap-2">
                                  <span className="text-5xl" role="img">
                                    {field.value}
                                  </span>
                                  <p className="text-xs text-muted-foreground">
                                    Click to change
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className="w-[48px] h-[48px] bg-card rounded-full"
                                    role="img"
                                  ></span>
                                  <p className="text-xs text-muted-foreground">
                                    Click to select
                                  </p>
                                </div>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className=" w-full">
                            <Picker
                              data={data}
                              onEmojiSelect={(e: { native: string }) => {
                                field.onChange(e.native);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription>
                        Appearance of the category (optional){" "}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => {
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCategoryDialog;
