"use client";
import AContainer from "@/components/AContainer";
import TeamsTable from "./TeamTable";
import { Button } from "@/components/ui/button";
import CreateTeamModal from "./CreateTeamModal";
import { useState } from "react";
import {
  useCreateTeamMutation,
  useGetTeamApisQuery,
} from "@/redux/api/teamApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import handleMutation from "@/utils/handleMutation";

const TeamContainer = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetTeamApisQuery("");
  const teams = data?.data || [];

  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();

  if (isLoading) {
    return <ASpinner className="flex justify-center items-center h-[70vh]" />;
  } else if (error) {
    return (
      <AErrorMessage className="h-[70vh]" error={error} onRetry={refetch} />
    );
  }

  const handleCreateTeam = async (name: string) => {
    await handleMutation({ name }, createTeam, "Team is being created...", () =>
      setOpen(false)
    );
  };
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Manage Teams</h3>
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
          <Button className="p-6" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Team"}
          </Button>
        </CreateTeamModal>
      </div>
      <TeamsTable teams={teams} />
    </AContainer>
  );
};

export default TeamContainer;
