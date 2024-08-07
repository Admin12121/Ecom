"use client";
import {
  Spinner,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useAllUsersQuery } from "@/lib/store/Service/User_Auth_Api";
import NewAdvancedTable from "@/components/Admin/home/table/NewTable";

const Accounts = () => {
  const [search , setSearch] = useState<string>('')
  const [rowsperpage , setRowsPerPage] = useState<number|null>(null)
  const [page, setPage] = useState<number>(1);
  const [ exclude_by, SetExcludeBy] = useState<string>('');
  const { data, isLoading, refetch, error } = useAllUsersQuery({search,rowsperpage, page, exclude_by});
  useEffect(()=>{
    refetch()
  },[search, rowsperpage])
  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 p-3 overflow-y-auto scroll">
      <span>
        <Breadcrumbs>
          <BreadcrumbItem>Users</BreadcrumbItem>
        </Breadcrumbs>
      </span>
      <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
        {isLoading ? (
          <span className="flex justify-center items-center h-[100vh] w-full">
            <Spinner color="default" />
          </span>
        ) : (
          <NewAdvancedTable SetExcludeBy={SetExcludeBy} exclude_by={exclude_by} page={page} isLoading={isLoading} setPage={setPage} data={data} setSearch={setSearch} dataperpage={setRowsPerPage} refetch={refetch}/>
        )}
      </div>
    </div>
  );
};
export default Accounts;
