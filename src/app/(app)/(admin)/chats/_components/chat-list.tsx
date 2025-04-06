"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/superbase";
import { UserRound } from "lucide-react";
import Spinner from "@/components/ui/spinner";

type User = {
  id: string;
  email: string;
  created_at: string;
};

interface ChatListProps {
  selectedChatId?: string | null;
  onSelectUser: (chat: string) => void;
}

export default function ChatList({
  selectedChatId,
  onSelectUser,
}: ChatListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch users:", error.message);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };
  return (
    <div className="divide-y divide-border/40">
      {loading ? (
        <div className="flex items-center justify-center h-full min-h-36 w-full">
          <Spinner size={"sm"} />
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className={`p-4 cursor-pointer transition-all hover:bg-muted/20 ${
              selectedChatId === user.id
                ? "bg-primary/10 border-l-4 border-l-primary"
                : "border-l-4 border-l-transparent"
            }`}
            onClick={() => onSelectUser(user.id)}
          >
            <div className="flex items-start gap-3">
              <UserRound />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{user?.email}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {/* {formatDistanceToNow(new Date(chat.lastMessageTime), {
                      addSuffix: true,
                    })} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
