"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schemas/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC, ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";
import CategoryPicker from "./CategoryPicker";

interface CreateTransactionDialogProps {
  trigger: ReactNode;
  type: TransactionType;
}

const CreateTransactionDialog: FC<CreateTransactionDialogProps> = ({
  trigger,
  type,
}) => {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
      description: "",
      amount: 0,
      category: "",
    },
  });

  const onSubmit = (data: CreateTransactionSchemaType) => {
    console.log(data);
    // Handle form submission
  };

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Short description of the transaction"
                    />
                  </FormControl>
                  <FormDescription>
                    Transaction Description (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Transaction Amount (required)
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        type={type}
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select category for transaction (required)
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}

                            <CalendarIcon className="ml-auto h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          className="bg-background"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Date of transaction (required)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
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
          <Button
          // onClick={form.handleSubmit(onSubmit)} disabled={isPending}
          >
            {/* {isPending ? <Loader2 className="animate-spin" /> : "Save"} */}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
