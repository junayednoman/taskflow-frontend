"use client";
import { ListTodo, PanelsTopLeft, User, Users } from "lucide-react";
import StatCard from "./StatCard";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";

const TopStats = () => {
  const { data } = useGetDashboardDataQuery("");
  const dashboardData = data?.data;
  return (
    <section>
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Teams"
          icon={<Users />}
          value={dashboardData?.teams || 0}
        />
        <StatCard
          title="Total Members"
          icon={<User />}
          value={dashboardData?.members || 0}
        />
        <StatCard
          title="Projects Created"
          icon={<PanelsTopLeft />}
          value={dashboardData?.projects || 0}
        />
        <StatCard
          title="Tasks Assigned"
          icon={<ListTodo />}
          value={dashboardData?.tasks || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;
