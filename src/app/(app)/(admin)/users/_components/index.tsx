"use client";

import React, { useState, useEffect } from "react";
import { useAllUsersQuery } from "@/lib/store/Service/User_Auth_Api";
import { useAuthUser } from "@/hooks/use-auth-user";
import UserTable from "./table";

const Accounts = () => {
  const { accessToken } = useAuthUser();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const { data, isLoading, refetch, error } = useAllUsersQuery(
    { search, rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken }
  );

  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [search]);

  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90dvh] m-0 p-3 overflow-y-auto scroll">
      <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
        <UserTable
          SetExcludeBy={SetExcludeBy}
          exclude_by={exclude_by}
          page={page}
          isLoading={isLoading}
          searchLoading={searchLoading}
          setPage={setPage}
          data={data}
          setSearch={setSearch}
          dataperpage={setRowsPerPage}
          refetch={refetch}
        />
      </div>
    </div>
  );
};
export default Accounts;
