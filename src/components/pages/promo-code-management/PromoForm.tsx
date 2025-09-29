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
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export const promoSchema = z.object({
  promoCode: z.string().min(1, "Promo code is required"),
  discountType: z.enum(["Percentage", "Flat"], {
    required_error: "Select discount type",
  }),
  value: z.string().min(1, "Select discount value"),
  usageLimit: z
    .string()
    .min(1, "Usage limit is required")
    .refine((v) => Number(v) > 0, "Must be greater than 0"),
  startDateTime: z.string().min(1, "Start date & time is required"),
  endDateTime: z.string().min(1, "End date & time is required"),
  thumbnail: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Image must be ≤ 2MB")
    .refine(
      (f) => !f || ["image/jpeg", "image/png", "image/jpg"].includes(f.type),
      "Only .jpg / .jpeg / .png"
    ),
});

export type PromoFormValues = z.infer<typeof promoSchema>;

const PERCENT_VALUES = ["5%", "10%", "15%", "20%", "25%", "30%", "40%", "50%"];
const FLAT_VALUES = ["5", "10", "25", "50", "100", "200", "500"];

type Props = {
  initialValues?: Partial<PromoFormValues>;
  initialImageUrl?: string;
  onSubmit: (values: PromoFormValues) => Promise<void> | void;
  onCancel?: () => void;
  afterSubmit?: () => void;
};

function genPromoCode(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export function PromoForm({
  initialValues,
  initialImageUrl,
  onSubmit,
  onCancel,
  afterSubmit,
}: Props) {
  const form = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      promoCode: initialValues?.promoCode ?? "",
      discountType: initialValues?.discountType ?? "Percentage",
      value: initialValues?.value ?? "",
      usageLimit: initialValues?.usageLimit ?? "",
      startDateTime: initialValues?.startDateTime ?? "",
      endDateTime: initialValues?.endDateTime ?? "",
      thumbnail: undefined,
    },
  });

  const watchType = form.watch("discountType");
  const [preview, setPreview] = React.useState<string | null>(
    initialImageUrl ?? null
  );

  const handleImageChange = (file?: File) => {
    form.setValue("thumbnail", file as any, { shouldValidate: true });
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(initialImageUrl ?? null);
  };

  const submit = async (values: PromoFormValues) => {
    await onSubmit(values);
    form.reset();
    setPreview(null);
    afterSubmit?.();
  };

  const handleCancel = () => {
    form.reset();
    setPreview(null);
    onCancel?.();
  };

  const handleGenerate = () => {
    form.setValue("promoCode", genPromoCode(), { shouldValidate: true });
  };

  const valueOptions = watchType === "Flat" ? FLAT_VALUES : PERCENT_VALUES;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        {/* Promo Code with Generate button to the right */}
        <FormField
          control={form.control}
          name="promoCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promo Code</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Enter promo code" {...field} />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleGenerate}
                  className={cn(
                    "absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3",
                    "bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-md border-none shadow"
                  )}
                >
                  Generate
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount Type */}
        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="Flat">Flat</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Value */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {valueOptions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {watchType === "Flat" ? `${v}` : v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Usage Limit */}
        <FormField
          control={form.control}
          name="usageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter usage limit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date & Time */}
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date & Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date & Time */}
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date & Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Thumbnail */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Upload Event Thumbnail</FormLabel>
              <FormControl>
                <div className="rounded-xl border border-dashed border-[#D5D8E1] p-6 text-center">
                  <label
                    htmlFor="promo-thumbnail"
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-28 w-28 rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <ImagePlus className="h-8 w-8 opacity-70" />
                        <span className="text-sm text-gray-600">
                          Upload photo (Max: 2MB, .jpg, .jpeg, .png)
                        </span>
                      </>
                    )}
                  </label>
                  <input
                    id="promo-thumbnail"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files?.[0])}
                  />
                </div>
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
            onClick={handleCancel}
            className="bg-white/10 hover:bg-white/20 text-[#100F0E] border border-[#D5D8E1] rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-lg border-none shadow-md"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
