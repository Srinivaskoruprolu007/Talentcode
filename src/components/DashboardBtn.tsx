"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const DashboardBtn = () => {
  const { isCandidate, isLoading } = useUserRole();
  if (isCandidate || isLoading) {
    return null;
  }
  return (
    <Link href="/dashboard">
      <Button className="gap-2 font-medium " size={"sm"}>
        <Zap className="h-4 w-4" />
        <span>Dashboard</span>
      </Button>
    </Link>
  );
};

export default DashboardBtn;
