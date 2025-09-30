"use client";


import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";


/**
 * Minimal shadcn-compatible form primitives
 * Works with:
 * <Form {...form}><form>...<FormField name="x" render={({field}) => (
 *   <FormItem>
 *     <FormLabel>Label</FormLabel>
 *     <FormControl><Input {...field} /></FormControl>
 *     <FormMessage />
 *   </FormItem>
 * )} /></form></Form>
 */


export const Form = FormProvider;


type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = { name: TName };


const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null
);


export function useFormField() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("useFormField must be used within <FormField>");
  }
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(ctx.name, formState);
  const id = React.useId();
  return {
    name: ctx.name,
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    fieldState,
  };
}


export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  const { name, ...rest } = props;
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} {...rest} />
    </FormFieldContext.Provider>
  );
}


export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}


export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  // Associate the label with the input via aria-* for accessibility
  const { formItemId } = safeUseFormIds();
  return (
    <label
      className={cn("text-sm font-medium", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}


export function FormControl({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // Simple wrapper; shadcn uses Slot, but a div works for most cases
  return <div className={cn(className)} {...props} />;
}


export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { fieldState, formMessageId } = safeUseFormIds();
  const body = fieldState.error ? String(fieldState.error.message) : null;
  if (!body && !children) return null;
  return (
    <p
      id={formMessageId}
      className={cn("text-xs text-red-600", className)}
      {...props}
    >
      {children ?? body}
    </p>
  );
}


export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = safeUseFormIds();
  return (
    <p
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}


/* ---------- helpers ---------- */
function safeUseFormIds() {
  // Use defaults if not inside a FormField (prevents crashes in edge cases)
  try {
    return useFormField();
  } catch {
    const id = React.useId();
    return {
      name: "",
      id,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
      fieldState: {
        invalid: false,
        isTouched: false,
        isDirty: false,
        error: undefined,
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
}





