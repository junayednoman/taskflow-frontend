"use client";
import { ListTodo, PanelsTopLeft, User, Users } from "lucide-react";
import StatCard from "./StatCard";

const TopStats = ({
  data,
}: {
  data: {
    teams: number;
    members: number;
    projects: number;
    tasks: number;
  };
}) => {
  return (
    <section>
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Teams"
          icon={<Users />}
          value={data.teams || 0}
        />
        <StatCard
          title="Total Members"
          icon={<User />}
          value={data.members || 0}
        />
        <StatCard
          title="Projects Created"
          icon={<PanelsTopLeft />}
          value={data.projects || 0}
        />
        <StatCard
          title="Tasks Assigned"
          icon={<ListTodo />}
          value={data.tasks || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;
