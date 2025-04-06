"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatList from "./chat-list";
import ChatView from "./chat-view";

export default function ChatDashboard() {
  const [user, setUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full dark:bg-neutral-950"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        maxSize={40}
        className="rounded-l-xl overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="pl-2 pt-1 pr-1">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 rounded-lg !bg-muted"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ChatList
              selectedChatId={user}
              onSelectUser={(chat) => setUser(chat)}
            />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="bg-muted/30 hover:bg-primary/20 transition-colors"
      />

      <ResizablePanel defaultSize={75}>
        {user ? (
          <ChatView chat={user} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Select a conversation to view
            </p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
