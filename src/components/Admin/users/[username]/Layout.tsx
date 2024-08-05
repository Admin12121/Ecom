"use client";
import {
  Spinner,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useAllUsersQuery } from "@/lib/store/Service/User_Auth_Api";
import { useParams } from "next/navigation";
import dynamic from 'next/dynamic'

const UserDate = dynamic(() => import('@/components/Admin/users/[username]/UserDate'), { ssr: false })

export default function User() {
    const params = useParams<{ username: string }>();
    const username = decodeURIComponent(params.username)

  const { data, isLoading, refetch, error } = useAllUsersQuery({username});

  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 p-3 overflow-y-auto scroll">
      <span>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link href="/admin/users" className="text-foreground/50">
                Users
            </Link>          
          </BreadcrumbItem>
          <BreadcrumbItem>{username}</BreadcrumbItem>
        </Breadcrumbs>
      </span>
      <div className="w-full h-full flex">
        {isLoading ? <span className="flex items-center justify-center h-full w-full"><Spinner color="default"/></span> : <UserDate data={data}/>}
      </div>
    </div>
  );
};
