"use client";

import React, { useState, useEffect } from "react";
import { useAllUsersQuery } from "@/lib/store/Service/User_Auth_Api";
import { authUser } from "@/hooks/use-auth-user";
import UserTable from "./table";

const Accounts = () => {
  const { accessToken } = authUser();
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const { data, isLoading, refetch, error } = useAllUsersQuery(
    { search, rowsperpage, page, exclude_by, token: accessToken },
    { skip: !accessToken }
  );

  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 p-3 overflow-y-auto scroll">
      <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
        <UserTable
          SetExcludeBy={SetExcludeBy}
          exclude_by={exclude_by}
          page={page}
          isLoading={isLoading}
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