"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const packageSchema = z.object({
  packageName: z.string().min(1, "Package name is required"),
  duration: z.enum(["7 days", "30 days", "90 days"], {
    required_error: "Select duration",
  }),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => Number(v) >= 0, "Must be 0 or greater"),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

const DURATION_OPTIONS = ["7 days", "30 days", "90 days"] as const;

type Props = {
  initialValues?: Partial<PackageFormValues>;
  onSubmit: (values: PackageFormValues) => Promise<void> | void;
  onCancel?: () => void;
  afterSubmit?: () => void;
  submitLabel?: string;
};

export default function PackageForm({
  initialValues,
  onSubmit,
  onCancel,
  afterSubmit,
  submitLabel = "Save",
}: Props) {
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      packageName: initialValues?.packageName ?? "",
      duration: (initialValues?.duration as any) ?? undefined,
      price: initialValues?.price ?? "",
    },
  });

  const submit = async (values: PackageFormValues) => {
    await onSubmit(values);
    form.reset();
    afterSubmit?.();
  };

  const cancel = () => {
    form.reset();
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Package Name */}
        <FormField
          control={form.control}
          name="packageName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter package name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DURATION_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  placeholder="e.g. 4.99"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={cancel}
            className="bg-white/10 hover:bg-white/20 text-[#100F0E] border border-[#D5D8E1] rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-lg border-none shadow-md"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
