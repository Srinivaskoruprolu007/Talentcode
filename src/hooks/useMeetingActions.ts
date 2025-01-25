import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const createInstantMeeting = async () => {
    if (!client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant Meeting",
          },
        },
      });
      router.push(`/meeting/${call.id}`);
      toast.success("Instant meeting created");
    } catch (error) {
      console.error("Error creating instant meeting", error);
      toast.error("Error creating instant meeting");
    }
  };

  const joinMeeting = async (callId: string) => {
    if (!client)
      return toast.error("Failed to connect to meeting, Please try again");
    router.push(`/meeting/${callId}`);
  };

  return { createInstantMeeting, joinMeeting };
};
export default useMeetingActions;
