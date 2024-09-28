"use client";
import { Spinner, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useGetReviewDataQuery } from "@/lib/store/Service/User_Auth_Api";
import ReviewTable from "@/app/(admin)/admin/reviews&comments/_components/table"


const Review = () => {
  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [star, setStar] = useState('0');
  const [filter, setFilter] = useState("relevant");
  const { data, isLoading, refetch } = useGetReviewDataQuery({
    search,
    rowsperpage,
    page,
    star,
    filter,
  });
  useEffect(() => {
    refetch();
  }, [search, rowsperpage]);
  return (
    <div className="lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 p-3 overflow-y-auto scroll">
      <span>
        <Breadcrumbs>
          <BreadcrumbItem>Reviews</BreadcrumbItem>
        </Breadcrumbs>
      </span>
      <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
        {isLoading ? (
          <span className="flex justify-center items-center h-[100vh] w-full">
            <Spinner color="default" />
          </span>
        ) : (
          <ReviewTable star={star} setStar={setStar} setFilter={setFilter} filter={filter} page={page} isLoading={isLoading} setPage={setPage} data={data} setSearch={setSearch} dataperpage={setRowsPerPage} refetch={refetch}/>
        )}
      </div>      
    </div>
  );
};

export default Review;
