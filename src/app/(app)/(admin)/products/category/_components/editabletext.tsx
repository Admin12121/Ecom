"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeleteModel from "@/components/global/delete-model";

interface EditableTextProps {
  initialText: string;
  initialId: number;
  onUpdate?: any;
  subcategoryupdateform: any;
  handleSubCategoryDelete: any;
}

export default function EditableText({
  initialText,
  initialId,
  onUpdate,
  subcategoryupdateform,
  handleSubCategoryDelete,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    subcategoryupdateform.setValue("name", initialText);
    subcategoryupdateform.setValue("id", initialId.toString());
    setIsEditing(true);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      {isEditing ? (
        <Form {...subcategoryupdateform}>
          <form
            onSubmit={subcategoryupdateform.handleSubmit(onUpdate)}
            className="p-1 flex gap-3"
          >
            <FormField
              control={subcategoryupdateform.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-auto bg-white dark:bg-neutral-900"
                      placeholder="Enter Sub Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Update</Button>
            <DeleteModel PROJECT_NAME={initialText} handleDelete={()=>handleSubCategoryDelete({ id: initialId.toString() })} title="Sub Category"/>
            <Button
              onClick={() => {
                setIsEditing(false);
              }}
              variant={"secondary"}
            >
              Cancel
            </Button>
          </form>
        </Form>
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          className="cursor-pointer hover:underline mb-2 border-l-1 px-1"
        >
          {initialText}
        </p>
      )}
    </div>
  );
}
