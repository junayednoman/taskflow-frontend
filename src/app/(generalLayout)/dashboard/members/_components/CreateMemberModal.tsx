"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import * as z from "zod";
import { ReactNode } from "react";

// Validation schema for member
const createMemberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  role: z.string().min(1, "Role is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

export type TCreateMember = z.infer<typeof createMemberSchema>;

interface CreateMemberModalProps {
  onCreate: (data: TCreateMember) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const CreateMemberModal = ({
  onCreate,
  children,
  open,
  setOpen,
}: CreateMemberModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Member</DialogTitle>
        </DialogHeader>

        <AForm<TCreateMember>
          schema={createMemberSchema}
          onSubmit={(data) => onCreate(data)}
          className="mt-3"
        >
          <AInput
            name="name"
            label="Member Name"
            placeholder="Enter member name"
            required
          />

          <AInput
            name="role"
            label="Role"
            placeholder="Enter role (e.g., Designer, Developer)"
            required
          />

          <AInput
            name="capacity"
            label="Capacity"
            placeholder="1, 2, 3, 4, 5"
            required
          />

          <DialogFooter>
            <Button type="submit">Create Member</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberModal;
