import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu as DropdownMenuNext,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor,
  Selection,
} from "@nextui-org/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  LoaderCircle,
  Search,
  ArrowRight,
  ChevronDown,
  RotateCcw as IoReload,
} from "lucide-react";

import { User } from "./user";
import { Pagination } from "@nextui-org/pagination";

import { labels } from "./data";

import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge as Chip } from "@/components/ui/badge";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const statusOptions = [
  { name: "Published", uid: "i_published" },
  { name: "Draft", uid: "draft" },
];

interface Users {
  id: number;
  password: string;
  email: string;
  profile: string | null;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  provider: string | null;
  dob: string | null;
  gender: string | null;
  state: string;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

interface ApiResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  page_size: number;
  results: Users[];
}

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "USER", uid: "email", sortable: true },
  { name: "PHONE", uid: "phone", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "SOCIAL", uid: "provider", sortable: true },
  { name: "GENDER", uid: "gender", sortable: true },
  { name: "STATE", uid: "state", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "email",
  "phone",
  "role",
  "provider",
  "state",
  "actions",
];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function UserTable({
  SetExcludeBy,
  data,
  setSearch,
  isLoading,
  dataperpage,
  refetch,
  page,
  setPage,
  exclude_by,
}: {
  exclude_by: string;
  SetExcludeBy: any;
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
  data: ApiResponse;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  dataperpage: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [searchValue, setsearchValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [users, setUsers] = React.useState<Users[]>([]);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const pages = Math.ceil(totalUsers / rowsPerPage);
  const [DeleteModalId, setDeleteModalId] = React.useState<number | null>(null);

  const handleColumnToggle = (columnUid: string) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnUid)) {
        newSet.delete(columnUid);
      } else {
        newSet.add(columnUid);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (data) {
      setUsers(data.results);
      setTotalUsers(data.count);
    }
  }, [data, page, exclude_by]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (statusFilter !== "all") {
      const selectedStatuses = Array.from(statusFilter);

      const excludedStatuses = statusOptions
        .map((option) => option.uid)
        .filter((status) => !selectedStatuses.includes(status));

      const oppositeStatuses = excludedStatuses.map((status) => {
        return status;
      });

      SetExcludeBy(oppositeStatuses);
    }

    return filteredUsers;
  }, [users, page, filterValue, statusFilter, SetExcludeBy]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Users, b: Users) => {
      const first = a[sortDescriptor.column as keyof Users] as number;
      const second = b[sortDescriptor.column as keyof Users] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, users, page, statusFilter, exclude_by]);

  const renderCell = React.useCallback((users: Users, columnKey: React.Key) => {
    const cellValue = users[columnKey as keyof Users];

    switch (columnKey) {
      case "email":
        return (
          <User
            avatarProps={{
              src: users?.profile as string,
              name: `${users.username.slice(0, 1)}`,
              // icon: `${(<AvatarIcon />)}`,
              classNames: {
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                icon: "text-black/80",
              },
            }}
            classNames={{
              description: "text-default-500",
              name: "cursor-pointer",
            }}
            description={users.email}
            name={`${users.username}`}
          />
        );
      case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{users.phone}</p>
          </div>
        );
      case "gender":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {users.gender || ""}
            </p>
          </div>
        );
      case "state":
        return (
          <Chip
            className={`capitalize border-none gap-1 text-default-600`}
            variant={users.state ? "secondary" : "outline"}
          >
            {users.state}
          </Chip>
        );
      case "provider":
        return <p>{users.provider || "default"}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <DropdownMenuNext>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push(`/users/${users.username}`)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>State</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={users.state}>
                      {labels.map((label) => (
                        <DropdownMenuRadioItem
                          key={label.value}
                          value={label.value}
                        >
                          {label.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDeleteModalId(users.id)}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuNext>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dataperpage(Number(e.target.value));
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (value?: string) => {
    if (value) {
      setsearchValue(value);
      setSearch(value);
      setPage(1);
    } else {
      setFilterValue("");
      setsearchValue("");
      setSearch("");
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="relative">
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => {
                onSearchChange(event.target.value);
              }}
              className="h-8 w-[150px] lg:w-[350px] peer pe-9 ps-9 bg-muted dark:bg-themeBlack dark:border-themeGray dark:text-themeTextGray placeholder:text-[rgb(39 39 42 / 1)]
                      flex h-9 w-full rounded-lg border px-3 py-2 text-sm text-foreground shadow-black/5 ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-transparent bg-muted shadow-none"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              {isLoading ? (
                <LoaderCircle
                  className="animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  role="presentation"
                />
              ) : (
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </div>
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Press to speak"
              type="submit"
            >
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-3">
            <DropdownMenuNext>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex h-8 gap-2 w-20 p-0 data-[state=open]:bg-muted"
                >
                  Status <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {statusOptions.map((status) => (
                  <DropdownMenuItem key={status.uid} className="cursor-pointer">
                    {capitalize(status.name)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuNext>
            <DropdownMenuNext>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex h-8 gap-2 w-24 p-0 data-[state=open]:bg-muted"
                >
                  Columns <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.uid}
                    className="cursor-pointer"
                    checked={
                      visibleColumns === "all" ||
                      (visibleColumns as Set<string>).has(column.uid)
                    }
                    onCheckedChange={() => handleColumnToggle(column.uid)}
                  >
                    {capitalize(column.name)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuNext>
            <Button
              variant="default"
              onClick={() => router.push("/user/add-user")}
              className="h-8 gap-2 px-2 lg:px-3 border-dashed font-normal text-xs"
            >
              <PlusCircledIcon className=" h-4 w-4" />
              New User
            </Button>
            <Button
              size="sm"
              variant="secondary"
              color="default"
              onClick={() => {
                refetch();
              }}
            >
              <IoReload className="h-4 w-4 text-small" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalUsers} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{ cursor: "bg-foreground text-background" }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No users found"}
          items={sortedItems}
          isLoading={isLoading}
          loadingContent={
            <span className="h-[50vh] flex items-center justify-center">
              <Spinner color="default" />
            </span>
          }
        >
          {(item: Users) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {DeleteModalId && (
        <DeleteModal
          DeleteModalId={DeleteModalId}
          setDeleteModalId={setDeleteModalId}
        />
      )}
    </>
  );
}

const DeleteModal = ({
  DeleteModalId,
  setDeleteModalId,
}: {
  DeleteModalId: number;
  setDeleteModalId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <section className="flex flex-col fixed w-[100vw] h-[100vh] bg-neutral-950/50 z-50 backdrop-blur-sm top-0 left-0 items-center justify-center">
      <Card className=" rounded-lg min-h-[150px] w-[300px]">
        <CardHeader className="pb-2">
          <h1 className="text-lg font-normal">Delete Course</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2 p-0 pb-2">
          <p className="text-xs text-default-700 font-normal">
            Are you sure you want to delete this course?
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setDeleteModalId(null)}
          >
            Cancel
          </Button>
          <Button size="sm" variant="secondary" color="danger">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
