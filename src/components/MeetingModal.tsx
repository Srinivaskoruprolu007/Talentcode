import { useState } from "react";
import { DialogContent, Dialog, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) => {
  const [meetingUrl, setMeetingUrl] = useState("");

  const createMeeting = async () => {};
  const joinMeeting = async () => {};

  const handleStart = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="paste meeting link here..."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value as string)}
            />
          )}
          <div className="flex justify-end gap-3">
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingUrl.trim()}
            >
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
