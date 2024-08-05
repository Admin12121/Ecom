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
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  ScrollShadow,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { HiDotsHorizontal as VerticalDotsIcon } from "react-icons/hi";
import { IoIosArrowDown as ChevronDownIcon } from "react-icons/io";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { statusOptions } from "./advanceddata";
import { useRouter } from "next/navigation";
import { AddUser } from "./add-user";

import { useForm, useFieldArray, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";




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

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "social", "status", "actions"];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function NewAdvancedTable({
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
  const [server, setServer] = React.useState<boolean>(false);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profile, setProfile] = React.useState<Users[]>([]);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const pages = Math.ceil(totalUsers / rowsPerPage);
  const [DeleteModalId, setDeleteModalId] = React.useState<number | null>(null);
  const [user, setUser] = React.useState<Users | null>(null);
  console.log(DeleteModalId);
  useEffect(() => {
    if (data) {
      setProfile(data.results);
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
    let filteredUsers = [...profile];
    if (statusFilter !== "all") {
      const selectedStatuses = Array.from(statusFilter);

      const excludedStatuses = statusOptions
        .map((option) => option.uid)
        .filter((status) => !selectedStatuses.includes(status));

      const oppositeStatuses = excludedStatuses.map((status) => {
        if (status === "active") return "blocked";
        if (status === "blocked") return "active";
        return status;
      });

      SetExcludeBy(oppositeStatuses);
    }

    return filteredUsers;
  }, [profile, page, filterValue, statusFilter, SetExcludeBy]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Users, b: Users) => {
      const first = a[sortDescriptor.column as keyof Users] as number;
      const second = b[sortDescriptor.column as keyof Users] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, profile, page, statusFilter, exclude_by]);

  const renderCell = React.useCallback((user: Users, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Users];

    switch (columnKey) {
      case "name":
        return (
          <>
            <User
              avatarProps={{
                radius: "full",
                size: "sm",
                src: user?.profile as string,
                name: `${user.first_name.slice(0, 1)}`,
                icon: `${(<AvatarIcon />)}`,
                classNames: {
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                  icon: "text-black/80",
                },
              }}
              classNames={{
                description: "text-default-500",
                name: "cursor-pointer",
              }}
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
            <p className="text-bold text-small capitalize">
              {user.is_admin ? "Admin" : "User"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={
              user.is_active
                ? user.is_blocked
                  ? "danger"
                  : "success"
                : "warning"
            }
            size="sm"
            variant="dot"
          >
            {user.is_active
              ? user.is_blocked
                ? "blocked"
                : "active"
              : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-100 w-[100px] min-w-[100px] max-w-[100px] p-0 rounded-[12px]">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  radius="sm"
                  size="sm"
                  variant="light"
                  className="w-[25px]"
                >
                  <VerticalDotsIcon className="text-default-400" size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-[100px] min-w-[100px] max-w-[100px]">
                <DropdownItem
                  onClick={() => router.push(`/admin/users/${user.username}`)}
                >
                  View
                </DropdownItem>
                <DropdownItem onClick={()=>{onOpen(); setUser(user)}}>Edit</DropdownItem>
                <DropdownItem onClick={() => setDeleteModalId(user.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 border-default-100",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={searchValue}
            variant="bordered"
            onClear={() => setsearchValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
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
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
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
            <AddUser />
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="default"
              onClick={() => {
                refetch();
                console.log("refetched");
              }}
            >
              <IoReload className="text-small" />
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
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        backdrop="blur"
        className="rounded-lg fixed md:right-0 w-[98vw] md:w-full h-[98vh] !my-[1vh] !mx-[1vw]  md:!my-0 md:!mx-2 max-md:!max-w-[100vw]"
        classNames={{
          closeButton: "rounded-lg border-1 border-default-300",
        }}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              x: 500,
              y: 0,
              opacity: 0.5,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b-1 border-default-300 ">
                <span className="flex flex-col">
                  <h1 className="text-lg font-normal">Edit Profile</h1>
                  <p className="text-xs text-default-400 font-normal">
                    {user?.email}
                  </p>
                </span>
              </ModalHeader>
              <ModalBody className="px-2 gap-3 ">
                <ScrollShadow className="flex flex-col gap-2 p-2 max-h-[78vh] overflow-auto">
                  <Card className="bg-neutral-950 rounded-lg min-h-[150px]">
                    <CardBody className="flex flex-col gap-2 p-5">
                      <Avatar
                        src={user?.profile as string}
                        className="w-16 h-16 text-large"
                        icon={<AvatarIcon />}
                        classNames={{
                          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                          icon: "text-black/80",
                        }}
                      />
                      <span className="flex flex-col">
                        <p className="text-xs text-default-400">{user?.username}</p>
                        <h1 className="text-base text-default-600">
                          {user?.first_name} {user?.last_name}
                        </h1>
                      </span>
                    </CardBody>
                  </Card>
                  <p className="px-1 mb-2">Basic Information</p>
                  <span className="pl-2 gap-2 flex flex-col">
                    <Input
                      type="text"
                      label="First Name"
                      labelPlacement="outside"
                      placeholder="Enter your first name"
                      radius="sm"
                    />
                    <Input
                      type="text"
                      label="Last Name"
                      labelPlacement="outside"
                      placeholder="Enter your email"
                      radius="sm"
                    />
                    <Input
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter your email"
                      radius="sm"
                    />
                    <Input
                      type="text"
                      label="Phone Number"
                      labelPlacement="outside"
                      placeholder="Enter your phone number"
                      radius="sm"
                    />
                    <Select
                      labelPlacement="outside"
                      label="Gender"
                      placeholder="Select your gende"
                      className="w-full"
                      radius="sm"
                    >
                      {gender.map((gender) => (
                        <SelectItem key={gender.key}>{gender.label}</SelectItem>
                      ))}
                    </Select>
                    <DatePicker
                      labelPlacement="outside"
                      label="Birthday"
                      showMonthAndYearPickers
                      className="w-full"
                      radius="sm"
                    />
                  </span>
                  <p className="px-1 my-2">Account Settings</p>
                  <span className="pl-2">
                    <Input
                      type="password"
                      label="Password"
                      labelPlacement="outside"
                      placeholder="Change Password"
                      value="12412412"
                      radius="sm"
                      disabled
                    />
                  </span>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter className="py-2">
                <Button className="bg-foreground text-background" size="sm">
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
        <CardHeader>
          <h1 className="text-lg font-normal">Delete User</h1>
          <span
            onClick={() => setDeleteModalId(null)}
            className="cursor-pointer absolute right-1 top-1 border-1 border-default-300 rounded-md hover:bg-neutral-950"
          >
            <IoIosClose size={25} />
          </span>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-2 p-0">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="w-16 h-16 text-large"
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "text-black/80",
            }}
          />
          <p className="text-xs text-default-400">@user123</p>
          <p className="text-xs text-default-700 font-normal">
            Are you sure you want to delete this user?
          </p>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="flat"
            onClick={() => setDeleteModalId(null)}
          >
            Cancel
          </Button>
          <Button size="sm" variant="shadow" color="danger">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
const gender = [
  {
    key: "male",
    label: "Male",
  },
  {
    key: "female",
    label: "Female",
  },
];
