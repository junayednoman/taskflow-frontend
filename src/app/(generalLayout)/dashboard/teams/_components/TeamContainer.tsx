"use client";
import AContainer from "@/components/AContainer";
import TeamsTable from "./TeamTable";
import { Button } from "@/components/ui/button";
import CreateTeamModal from "./CreateTeamModal";
import { toast } from "sonner";
import { useState } from "react";

const TeamContainer = () => {
  const [open, setOpen] = useState(false);

  const handleCreateTeam = (name: string) => {
    toast.success("Team created successfully");
    console.log("data, ", name);
    setOpen(false);
  };
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Manage Your Teams</h3>
        <p className="text-base text-card-foreground">
          View team members, track their workloads, and easily balance tasks
          across your projects.
        </p>
      </div>
      <div className="flex justify-end">
        <CreateTeamModal
          open={open}
          setOpen={setOpen}
          onCreate={handleCreateTeam}
        >
          <Button className="p-6">Create Team</Button>
        </CreateTeamModal>
      </div>
      <TeamsTable />
    </AContainer>
  );
};

export default TeamContainer;
