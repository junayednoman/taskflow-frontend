import AContainer from "@/components/AContainer";
import TopStats from "./TopStats";
import TeamSummary from "./TeamSummary";
import RecentActivities from "./RecentAcitivities";

const DashboardContainer = () => {
  return (
    <AContainer>
      <div className="space-y-6">
        <TopStats
          data={{ members: 234, projects: 34, tasks: 635, teams: 23 }}
        />
        <TeamSummary />
        <RecentActivities />
      </div>
    </AContainer>
  );
};

export default DashboardContainer;
