"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useState } from "react";
import LoaderUI from "@/components/LoaderUI";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import useCallGetById from "@/hooks/useCallGetById";

const MeetingsPage = () => {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useCallGetById(id);

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingsPage;
