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
import { ReactNode } from "react";
import { createMemberSchema, TCreateMember } from "../member.validation";
import { ASelect } from "@/components/form/ASelect";

interface CreateMemberModalProps {
  onCreate: (data: TCreateMember) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  isLoading?: boolean;
  teams: { label: string; value: string }[];
}

const CreateMemberModal = ({
  onCreate,
  children,
  open,
  setOpen,
  isLoading,
  teams,
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

          <ASelect
            name="team"
            label="Team"
            placeholder="Select a team"
            options={teams}
            required
          />
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Member"}
            </Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberModal;
