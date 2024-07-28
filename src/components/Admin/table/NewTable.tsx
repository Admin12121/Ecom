import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  AvatarIcon,
  Tooltip,
  Spinner
} from "@nextui-org/react";
import Link from "next/link";
import { IoIosAdd as PlusIcon } from "react-icons/io";
import { TiFlowSwitch } from "react-icons/ti";
import { IoReload } from "react-icons/io5";
import { HiDotsHorizontal as VerticalDotsIcon } from "react-icons/hi";
import { IoIosArrowDown as ChevronDownIcon } from "react-icons/io";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { statusOptions } from "./advanceddata";
import { useRouter } from 'next/navigation'

interface Users {
  id: number;
  password: string;
  email: string;
  profile: string | null;
  first_name: string;
  last_name: string;
  username: string | null;
  phone: string;
  dob: string | null;
  gender: string | null;
  is_otp_verified: boolean;
  tc: boolean;
  is_blocked: boolean;
  is_active: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  otp_device: number | null;
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

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  blocked: "danger",
  vacation: "warning",
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PHONE", uid: "phone", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "SOCIAL", uid: "social" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "social",  "status", "actions"];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function NewAdvancedTable({ data ,setSearch,isLoading, dataperpage, refetch, page, setPage}: {isLoading:boolean,page: number,setPage: React.Dispatch<React.SetStateAction<number>>, refetch:()=>void,data: ApiResponse, setSearch:React.Dispatch<React.SetStateAction<string>>, dataperpage: React.Dispatch<React.SetStateAction<number | null>>}) {
  const router = useRouter()
  const [filterValue, setFilterValue] = React.useState("");
  const [searchValue, setsearchValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [server, setServer] = React.useState<boolean>(false);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [profile, setProfile] = React.useState<Users[]>([]);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const pages = Math.ceil(totalUsers / rowsPerPage);
  
  useEffect(() => {
    if (data) {
      setProfile(data.results);
      setTotalUsers(data.count)
    }
  }, [data, page]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...profile];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.is_active ? user.is_blocked ? "active" : "blocked" : "inactive")
      );
    }

    return filteredUsers;
  }, [profile, page, filterValue, statusFilter]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems, profile, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Users, b: Users ) => {
      const first = a[sortDescriptor.column as keyof Users] as number;
      const second = b[sortDescriptor.column as keyof Users] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor,profile, page, statusFilter]);
  // }, [sortDescriptor, items,profile, page]);

  const renderCell = React.useCallback((user: Users, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Users];

    switch (columnKey) {
      case "name":
        return (
          <>
            <User
              avatarProps={{ radius: "full", size: "sm", src: user?.profile as string , name:`${user.first_name.slice(0,1)}`, icon:`${<AvatarIcon />}`,
                classNames:{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                  icon: "text-black/80",
                }
              }}
              classNames={{ description: "text-default-500" ,name:"cursor-pointer"}}
              description={user.email}
              name={`${user.first_name} ${user.last_name}`}
            >
              {user.email}
            </User>
          </>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.is_admin ? "Admin" : "User"}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={user.is_active ? user.is_blocked ? "danger" : "success" :  "warning"}
            size="sm"
            variant="dot"
          >
            {user.is_active ? user.is_blocked ? "blocked" : "active" : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-100 w-[100px] min-w-[100px] max-w-[100px] p-0 rounded-[12px]" >
              <DropdownTrigger >
                <Button isIconOnly radius="sm" size="sm" variant="light" className="w-[25px]">
                  <VerticalDotsIcon className="text-default-400" size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-[100px] min-w-[100px] max-w-[100px]">
                <DropdownItem onClick={()=>router.push(`/admin/users/${user.username}`)}>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
    if(server){
      dataperpage(Number(e.target.value))
    }
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }

  const onSearchChange = (value?: string) => {
    if (value) {
      if(server){
        setsearchValue(value)
        setSearch(value)
      }else{
        console.log("local")
        setsearchValue(value)
        setFilterValue(value);
      }
      setPage(1);
    } else {
      setFilterValue("");
      setsearchValue("");
      setSearch("");

    }
  }

const topContent = React.useMemo(() => {

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <span className="flex gap-2 w-full sm:w-[50%]">
            <Input
              isClearable
              classNames={{ base: "w-full sm:max-w-[80%]", inputWrapper: "border-1 border-default-100" }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={searchValue}
              variant="bordered"
              onClear={() => setsearchValue("")}
              onValueChange={onSearchChange}
            />
            <Tooltip content={!server ? "Table" : "Server"}>
                <Button color={`${server ? "success": "warning"}`} isIconOnly size="sm" variant="flat" aria-label="Switch" onClick={() => setServer(!server)}>
                  <TiFlowSwitch size={16}/>
                </Button>    
            </Tooltip>
          </span>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon size={18}/>}
              size="sm"
            >
              Add New
            </Button>
            <Button  isIconOnly size="sm" variant="flat" color="default" onClick={()=>{refetch();console.log('refetched')}}><IoReload className="text-small" /></Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {totalUsers} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
              onChange={onRowsPerPageChange}
            >
              <option  value="10">10</option>
              <option  value="20">20</option>
              <option  value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    server,
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    profile.length,
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
  // }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
          wrapper: "after:bg-foreground after:text-background text-background",
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
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems} isLoading={isLoading} loadingContent={<span className="h-[50vh] flex items-center justify-center"><Spinner color="default"/></span>}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  );
}
