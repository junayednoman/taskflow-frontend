"use client";
import AContainer from "@/components/AContainer";
import MemberTable from "./MemberTable";

const MemberContainer = () => {
  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Team Members Overview</h3>
        <p className="text-base text-card-foreground">
          See all members, check their workload, and manage team capacity
          easily.
        </p>
      </div>
      <MemberTable />
    </AContainer>
  );
};

export default MemberContainer;
