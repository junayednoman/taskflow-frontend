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
const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

type TCreateTeam = z.infer<typeof createTeamSchema>;

interface CreateTeamModalProps {
  onCreate: (name: string) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  isCreating?: boolean;
}

const CreateTeamModal = ({
  onCreate,
  children,
  open,
  setOpen,
  isCreating,
}: CreateTeamModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>

        <AForm<TCreateTeam>
          schema={createTeamSchema}
          defaultValues={{ name: "" }}
          onSubmit={(data) => onCreate(data.name)}
        >
          <AInput
            name="name"
            label="Team Name"
            placeholder="Enter team name"
            required
          />
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Team"}
            </Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;
