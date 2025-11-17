import Image from "next/image";
import icon from "@/assets/icon.png";
import Link from "next/link";
import { SidebarHeader, useSidebar } from "../ui/sidebar";

const SidebarTop = () => {
  const { state } = useSidebar();
  return (
    <SidebarHeader>
      {state === "expanded" ? (
        <Link
          href={"/dashboard"}
          className="flex items-center justify-between gap-6 mt-2 pl-1"
        >
          <h1 className="text-3xl font-bold">TaskFlow</h1>
        </Link>
      ) : (
        state === "collapsed" && (
          <Link
            href={"/dashboard"}
            className="flex items-center justify-between gap-6 mt-2"
          >
            <Image src={icon} alt="logo" width={28} height={28} />
          </Link>
        )
      )}
    </SidebarHeader>
  );
};

export default SidebarTop;
