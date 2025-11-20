import AContainer from "@/components/AContainer";
import LogsTable from "./LogsTable";

const LogsContainer = () => {
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Activity Logs</h3>
        <p className="text-base text-card-foreground">
          View all project and task activities, track changes, and monitor team
          actions in real-time.
        </p>
      </div>
      <LogsTable />
    </AContainer>
  );
};

export default LogsContainer;
