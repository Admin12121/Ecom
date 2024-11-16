import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserProps{
    avatarProps:{
        src:string;
        name:string;
        icon?: any;
        classNames?: {
            base?: string;
            icon?: string;
        }
    }
    classNames?:{
        base?: string;
        description?:string;
        name?:string;
    }
    description?:string;
    name:string;
}

export const User = ({avatarProps, classNames, description, name}:UserProps) => {
  return (
    <div className={cn("flex gap-2", classNames?.base )}>
      <Avatar>
        <AvatarImage src={avatarProps.src || ''} alt={avatarProps.name} />
        <AvatarFallback>{avatarProps?.icon || avatarProps.name.slice(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className={cn("", classNames?.name)}>
        <h1>{name}</h1>
        <p className={cn("", classNames?.description)}>{description}</p>
      </span>
    </div>
  );
};

export default User;
