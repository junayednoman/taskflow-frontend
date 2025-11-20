"use client";

import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditTeamModal from "./EditTeamModal";
import { TTeam } from "../team.interface";
import { useUpdateTeamMutation } from "@/redux/api/teamApi";
import handleMutation from "@/utils/handleMutation";
import Link from "next/link";

const TeamsTable = ({ teams }: { teams: TTeam[] }) => {
  const [openTeamId, setOpenTeamId] = useState<string | null>(null);
  const [updateTeam, { isLoading }] = useUpdateTeamMutation();

  const handleEditTeam = async (name: string) => {
    const payload = {
      id: openTeamId as string,
      name,
    };
    await handleMutation(payload, updateTeam, "Team is being updated...", () =>
      setOpenTeamId(null)
    );
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mt-4">
        <div className="grid grid-cols-12 bg-primary px-6 py-3 text-card font-semibold">
          <div className="col-span-4">Team Name</div>
          <div className="col-span-2">Members</div>
          <div className="col-span-2">Total Tasks</div>
          <div className="col-span-2">Capacity</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-border">
          {teams.length > 0 ? (
            teams.map((team: TTeam) => {
              const isOverloaded = team.totalTasks > team.totalCapacity;
              return (
                <div
                  key={team.id}
                  className={`grid grid-cols-12 px-6 py-3 items-center hover:bg-accent transition-colors rounded`}
                >
                  <div className="col-span-4 font-medium">{team.name}</div>
                  <div className="col-span-2">{team.members.length}</div>
                  <div className="col-span-2">{team.totalTasks}</div>
                  <div
                    className={`col-span-2 font-medium ${
                      isOverloaded ? "text-destructive" : "text-green-600"
                    }`}
                  >
                    {team.totalTasks}/{team.totalCapacity}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/dashboard/members?team=${team.id}`}>
                          <Button className="bg-primary/10 hover:bg-primary/20">
                            <Eye className="text-primary" size={27} />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Members</p>
                      </TooltipContent>
                    </Tooltip>
                    <EditTeamModal
                      isLoading={isLoading}
                      data={team}
                      key={team.id}
                      open={openTeamId === team.id}
                      setOpen={(isOpen) =>
                        setOpenTeamId(isOpen ? team.id : null)
                      }
                      onEdit={handleEditTeam}
                    >
                      <Button className="bg-foreground/10 hover:bg-foreground/20">
                        <Pencil className="text-foreground" size={27} />
                      </Button>
                    </EditTeamModal>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-44 col-span-12 text-center text-muted-foreground">
              No teams found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsTable;
