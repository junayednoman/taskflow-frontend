"use client";
import AContainer from "@/components/AContainer";
import MemberTable from "./MemberTable";
import { useGetMembersQuery } from "@/redux/api/memberApi";
import { useGetTeamApisQuery } from "@/redux/api/teamApi";
import { TTeam } from "../../teams/team.interface";
import { useEffect, useState } from "react";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";

const MemberContainer = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedTeam, setSelectedTeam] = useState("");
  const { data: teamData, isLoading, error, refetch } = useGetTeamApisQuery("");
  const teams = teamData?.data?.map((team: TTeam) => ({
    id: team.id,
    name: team.name,
  }));

  useEffect(() => {
    setSelectedTeam(teamData?.data[0].id);
  }, [teamData, isLoading]);

  const params = {
    page,
    limit,
    team: selectedTeam,
  };
  const {
    data,
    isLoading: isMembersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useGetMembersQuery(params, { skip: !selectedTeam });
  const members = data?.data.members;

  if (isLoading || isMembersLoading) {
    return <ASpinner className="flex justify-center items-center h-[70vh]" />;
  } else if (error || membersError) {
    return (
      <AErrorMessage
        className="h-[70vh]"
        error={error || membersError}
        onRetry={error ? refetch : refetchMembers}
      />
    );
  }
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Team Members Overview</h3>
        <p className="text-base text-card-foreground">
          See all members, check their workload, and manage team capacity
          easily.
        </p>
      </div>
      <MemberTable
        page={page}
        setPage={setPage}
        limit={limit}
        meta={data?.data?.meta}
        members={members || []}
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
    </AContainer>
  );
};

export default MemberContainer;
