"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CreateTeamModal from "./CreateMemberModal";
import { Button } from "@/components/ui/button";
import { APagination } from "@/components/ui/APagination";
import { TTeam } from "../../teams/team.interface";
import { TMember } from "../member.interface";
import { useCreateMemberMutation } from "@/redux/api/memberApi";
import handleMutation from "@/utils/handleMutation";
import { TCreateMember } from "../member.validation";
import { TMeta } from "../../dashboard.interface";

type TProps = {
  teams: TTeam[];
  meta: TMeta;
  selectedTeam: string;
  setSelectedTeam: (teamId: string) => void;
  members: TMember[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
};

const MemberTable = ({
  teams,
  selectedTeam,
  setSelectedTeam,
  members,
  page,
  setPage,
  limit,
  meta,
}: TProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [addMember, { isLoading }] = useCreateMemberMutation();

  const handleCreateMember = async (data: TCreateMember) => {
    const payload = {
      ...data,
      teamId: selectedTeam,
      capacity: Number(data.capacity),
    };

    await handleMutation(payload, addMember, "Member is being added...", () => {
      setOpenCreateModal(false);
    });
  };

  return (
    <Card className="w-full mx-auto shadow-none! border-border/60 mt-6">
      <CardHeader className="flex gap-6 justify-end items-center">
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-48 h-12! border-border">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CreateTeamModal
          isLoading={isLoading}
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          onCreate={handleCreateMember}
        >
          <Button disabled={isLoading} className="p-6">
            {isLoading ? "Creating..." : "Create Member"}
          </Button>
        </CreateTeamModal>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="grid grid-cols-12 bg-primary px-4 py-3 text-card font-semibold">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-2">Current Tasks</div>
            <div className="col-span-2">Capacity</div>
            <div className="col-span-1">Status</div>
          </div>
          <div className="divide-y divide-border">
            {members.length > 0 ? (
              members.map((member: TMember) => {
                const overload = member._count.tasks > member.capacity;
                return (
                  <div
                    key={member.id}
                    className={`grid grid-cols-12 px-4 py-3 items-center ${
                      overload ? "bg-destructive/5" : ""
                    }`}
                  >
                    <div className="col-span-4">{member.name}</div>
                    <div className="col-span-3">{member.role}</div>
                    <div className="col-span-2 font-medium">
                      {member._count.tasks}
                    </div>
                    <div className="col-span-2">{member.capacity}</div>
                    <div
                      className={`col-span-1 font-medium ${
                        overload ? "text-destructive" : "text-green-600"
                      }`}
                    >
                      {overload ? "Overloaded" : "OK"}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-44 col-span-12 text-center text-muted-foreground">
                No members found!
              </div>
            )}
          </div>
        </div>
      </CardContent>
      {/* pagination */}
      {meta?.total > limit && (
        <div className="mt-2">
          <APagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={meta?.total}
            itemsPerPage={limit}
          />
        </div>
      )}
    </Card>
  );
};

export default MemberTable;
