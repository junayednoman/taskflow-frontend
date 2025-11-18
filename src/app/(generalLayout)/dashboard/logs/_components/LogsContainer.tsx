import AContainer from "@/components/AContainer";
import LogsTable from "./LogsTable";

const LogsContainer = () => {
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Manage Your Tasks</h3>
        <p className="text-base text-card-foreground">
          Manage all your tasks, track their status, and assign them to team
          members
        </p>
      </div>
      <LogsTable />
    </AContainer>
  );
};

export default LogsContainer;
