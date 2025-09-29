"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type UserReportDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "view" | "edit";
  user?: {
    id: number;
    userName: string;
    email: string;
  } | null;
};

export default function UserReportDialog({
  open,
  onOpenChange,
  mode,
  user,
}: UserReportDialogProps) {
  const [note, setNote] = React.useState(
    "Last 30 days: 12 sessions • No violations reported."
  );

  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl bg-white px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-[20px]">
            {mode === "view" ? "View Report" : "Edit Report"}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {user ? `${user.userName} • ${user.email}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {mode === "view" ? (
            <div className="rounded-md border border-[#E6E7EB] p-3 text-sm text-[#100F0E] bg-white/50">
              {note}
            </div>
          ) : (
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              className="bg-white"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={close}
            className="bg-white/10 hover:bg-white/20 text-[#100F0E] border border-[#D5D8E1] rounded-lg"
          >
            {mode === "view" ? "Close" : "Cancel"}
          </Button>
          {mode === "edit" && (
            <Button
              onClick={close}
              className="bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-lg"
            >
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
