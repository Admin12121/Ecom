"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { MessageCircle, Minus } from "lucide-react";
import { supabase } from "@/lib/superbase";
import type React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { siteConfig } from "@/config/site";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const suggestedQuestions = [
  "Where is my order?",
  "Do you offer any discounts?",
  "What is your return policy?",
  "How long does delivery take?",
  "Can I cancel my order?",
  "Do you ship internationally?",
  "How can I track my package?",
  "What payment methods are accepted?",
  "How do I apply a coupon code?",
  "Can I change my delivery address?",
];

export default function ChatInterface() {
  const { user } = useAuthUser();
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const adminEmail = "admin12121@gmail.com";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!user?.email) return;
    initChat();
  }, [user?.email]);

  const initChat = async () => {
    setLoading(true);
    if (!user?.email) return;
    const currentId = await getOrCreateUser(user.email);
    const adminId = await getOrCreateUser(adminEmail);

    if (!currentId || !adminId) return;

    setCurrentUserId(currentId);
    await fetchMessages(currentId);

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
    setLoading(false);
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

    const senderId = await getOrCreateUser(user.email);
    const receiverId = await getOrCreateUser(adminEmail);

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
    <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg overflow-hidden flex flex-col h-[650px] min-w-[550px] max-w-[600px] my-10 relative">
      <div className="px-4 py-3.5 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-blue-500 mr-2">
            <MessageCircle />
          </span>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="text-lg font-semibold mr-2 cursor-pointer">
                  Chat
                </h2>
              </TooltipTrigger>
              <TooltipContent className="py-3 max-w-[350px]">
                <div className="space-y-1">
                  <p className="text-[13px] font-medium">Smart Chat</p>
                  <p className="text-muted-foreground text-xs">
                    This is a smart chat interface that allows you to interact
                    with our ai assistant & support team. You can ask questions,
                    get assistance, and receive updates on your queries.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Minus />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-32 h-32 mb-4 relative ">
            <Image
              src="/assits/blob.gif"
              alt="3D Blob"
              fill
              className="!w-48 !h-34 object-cover absolute rounded-full bg-blue-400/20"
              priority
            />
          </div>
          <p className="text-center text-[#a8b0b8] max-w-xs font-light">
            Welcome to {siteConfig.title} chat! <br />
            I&apos;m here to assist you with any questions or concerns you may have.
          </p>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === currentUserId ? "self-end" : "self-start"
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
        {messages.length === 0 && (
          <div className="px-4 py-2 flex flex-col items-end gap-2">
            {(showAllQuestions
              ? suggestedQuestions
              : suggestedQuestions.slice(0, 3)
            ).map((q, idx) => (
              <button
                key={idx}
                className="bg-white text-[#4a5568] border border-[#e2e8f0] rounded-xl text-sm py-2.5 px-5 hover:bg-gray-50 shadow-sm w-fit"
                onClick={() => handleSendMessage(q)}
              >
                {q}
              </button>
            ))}
            {!showAllQuestions && (
              <div className="w-full text-right mt-1">
                <button
                  className="text-[#a8b0b8] text-sm font-normal hover:underline"
                  onClick={() => setShowAllQuestions(true)}
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-2 z-50">
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
              onClick={() => handleSendMessage()}
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
