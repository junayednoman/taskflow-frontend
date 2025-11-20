"use client";
import dynamic from "next/dynamic";

const MemberContainer = dynamic(() => import("./_components/MemberContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <MemberContainer />
    </main>
  );
}
