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

// Validation schema for team
const editTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

type TEditTeam = z.infer<typeof editTeamSchema>;

interface EditTeamModalProps {
  onEdit: (name: string) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const EditTeamModal = ({
  onEdit,
  children,
  open,
  setOpen,
}: EditTeamModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
        </DialogHeader>

        <AForm<TEditTeam>
          schema={editTeamSchema}
          defaultValues={{ name: "" }}
          onSubmit={(data) => onEdit(data.name)}
        >
          <AInput
            name="name"
            label="Team Name"
            placeholder="Enter team name"
            required
          />
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamModal;
