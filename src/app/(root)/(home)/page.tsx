"use client";
import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isInterviewer, isLoading, isCandidate } = useUserRole();

  const router = useRouter();
  const interviews = useQuery(api.interview.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };
  if (isLoading)
    return (
      <Skeleton className="flex flex-col gap-4 container max-w-7xl mx-auto rounded-lg bg-card p-6 border shadow-sm mb-10">
        <Skeleton className="h-48 w-full mb-4" />
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-40 w-40" />
        </div>
      </Skeleton>
    );
  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* Welcome section */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-400 text-transparent bg-clip-text">
          Welcome back to{" "}
          <span className="font-bold hover:underline cursor-pointer ">
            TalentCode
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your interview schedule and prepare for your upcoming interviews"}
        </p>
      </div>
      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>Candidates view goes here</div>
        </>
      )}
    </div>
  );
}
