"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreateEventForm,
  CreateEventFormValues,
} from "../pages/event-management/CreateEventForm";

type CreateEventDialogProps = {
  /** Optional trigger (e.g., a Button). If omitted, control with open/onOpenChange */
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (values: CreateEventFormValues) => Promise<void> | void;
  initialValues?: Partial<CreateEventFormValues>;
};

export default function CreateEventDialog({
  trigger,
  open,
  onOpenChange,
  onSubmit,
  initialValues,
}: CreateEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-w-lg sm:max-w-x bg-white px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Create New Event</DialogTitle>
        </DialogHeader>

        <CreateEventForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange?.(false)}
          afterSubmit={() => onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
