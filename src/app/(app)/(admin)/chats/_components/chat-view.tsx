"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { MoreVertical, User, ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/lib/superbase";

interface ChatViewProps {
  chat: string;
}

export default function ChatView({ chat }: ChatViewProps) {
  const { user } = useAuthUser();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const adminEmail = "admin12121@gmail.com";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user && chat) {
      initChat();
    }
  }, [user, chat]); 

  const initChat = async () => {
    const currentId = await getOrCreateUser(adminEmail);
    const adminId = chat;

    if (!currentId || !adminId) return;

    setCurrentUserId(currentId);
    await fetchMessages(chat);

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const m = payload.new;
          if (m.sender === currentId || m.receiver === currentId) {
            setMessages((prev) => [...prev, m]);
          }
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  };

  const getOrCreateUser = async (email: string): Promise<string | null> => {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) return existingUser.id;

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ email })
      .select("id")
      .single();

    if (newUser) return newUser.id;
    console.error("Error creating user:", error);
    return null;
  };

  const fetchMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender.eq.${userId},receiver.eq.${userId}`)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data);
  };

  const handleSendMessage = async (msg?: string) => {
    const messageToSend = msg ?? input;
    if (!messageToSend.trim() || !user?.email) return;

    const senderId = currentUserId;
    const receiverId = chat;

    if (!senderId || !receiverId) return;

    const { error } = await supabase.from("messages").insert({
      sender: senderId,
      receiver: receiverId,
      message: messageToSend,
    });

    if (error) {
      console.error("Failed to send message:", error);
    } else {
      if (!msg) setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "hh:mm a");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border/40 p-4 bg-background/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border/40 shadow-sm items-center justify-center">
              <UserRound className="h-6 w-6" />
            </Avatar>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 border-border/40"
                  >
                    <User className="h-4 w-4" />
                    {}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Customer Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 border-border/40"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Orders</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8 border-border/40"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl border-border/40"
              >
                <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                <DropdownMenuItem>Transfer Conversation</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuItem>Block Customer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-background/90 to-background/70">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === currentUserId
                ? "flex flex-col items-end justify-center"
                : "self-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === currentUserId
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.message}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatTime(message.created_at)}
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
      <div className="p-2">
        <div className="flex flex-col items-center rounded-2xl overflow-hidden border">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 border-none outline-none px-3 py-3 text-neutral-700 dark:text-neutral-400  w-full"
          />
          <div className="flex items-center justify-between w-full px-3 py-3 bg-neutral-100 dark:bg-neutral-950">
            <div className="mr-2 text-blue-500 flex gap-1 ">
              <span className="text-sm text-blue-500 font-medium"></span>
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              onSubmit={() => handleSendMessage()}
              className="text-[#d1d5db]  hover:text-gray-400"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
