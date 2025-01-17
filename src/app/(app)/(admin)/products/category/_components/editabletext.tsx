// components/EditableText.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditableTextProps {
  initialText: string;
  onUpdate?: (updatedText: string) => void;
}

export default function EditableText({
  initialText,
  onUpdate,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      {isEditing ? (
        <div className="p-1 flex gap-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            className="w-auto bg-white dark:bg-neutral-900"
          />
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleUpdate} variant={"destructive"}>
            Delete
          </Button>
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
            variant={"secondary"}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          className="cursor-pointer hover:underline mb-2 border-l-1 px-1"
        >
          {text}
        </p>
      )}
    </div>
  );
}
