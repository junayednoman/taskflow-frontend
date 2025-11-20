"use client";
import AContainer from "@/components/AContainer";
import TopStats from "./TopStats";
import TeamSummary from "./TeamSummary";
import RecentActivities from "./RecentAcitivities";
import { useGetTeamApisQuery } from "@/redux/api/teamApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetMembersQuery } from "@/redux/api/memberApi";
import { TTeam } from "../teams/team.interface";
import { useEffect, useState } from "react";
import { useGetLogsQuery } from "@/redux/api/logsApi";

const DashboardContainer = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const { data: teamData, isLoading, error, refetch } = useGetTeamApisQuery("");
  const teams = teamData?.data?.map((team: TTeam) => ({
    id: team?.id,
    name: team?.name,
  }));
  useEffect(() => {
    setSelectedTeam(teamData?.data[0]?.id);
  }, [teamData, isLoading]);

  const {
    data,
    isLoading: isLoadingMembers,
    error: errorMembers,
    refetch: refetchMembers,
  } = useGetMembersQuery(
    { team: selectedTeam, limit: 5 },
    { skip: !selectedTeam }
  );
  const memberData = data?.data;

  // fetch logs  data
  const {
    data: logsData,
    isLoading: isLoadingLogs,
    error: errorLogs,
    refetch: refetchLogs,
  } = useGetLogsQuery({ limit: 5 });

  if (isLoading || isLoadingMembers || isLoadingLogs)
    return <ASpinner className="flex justify-center items-center h-[70vh]" />;
  if (error || errorMembers || errorLogs) {
    return (
      <AErrorMessage
        error={error || errorMembers || errorLogs}
        onRetry={error ? refetch : errorMembers ? refetchMembers : refetchLogs}
        className="h-[70vh]"
      />
    );
  }
  return (
    <AContainer>
      <div className="space-y-6">
        <TopStats />
        <TeamSummary
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          memberData={memberData?.members}
          teams={teams}
        />
        <RecentActivities logsData={logsData?.data?.logs} />
      </div>
    </AContainer>
  );
};

export default DashboardContainer;
