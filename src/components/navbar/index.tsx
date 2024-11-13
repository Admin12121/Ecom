"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Select,
  Skeleton,
  SelectItem,
  AvatarIcon,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { AcmeLogo } from "./AcmeLogo";
import { PlaceholdersAndVanishInput } from "./SearchBox/Search";
import Link from "next/link";
import useAuth from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useGetLoggedUserQuery } from "@/lib/store/Service/User_Auth_Api";
import ShopMenu from "./HoverMenu/menu";
import { IoMdHeartEmpty } from "react-icons/io";

const NotificationsDropdown = dynamic(
  () => import("../Admin/layout/navbar/notifications-dropdown"),
  { ssr: false }
);
const AddtoCart = dynamic(() => import("./Sheet"), { ssr: false });

interface UserDropdownProps {
  handleLogoutWithCall: () => void;
}

interface UserData {
  email: string;
  profile: string | null;
  phone: string | null;
  username: string;
  last_name: string;
  first_name: string;
  role: string;
  gender: string | null;
  dob: string | null;
}

interface CurrencySelectorProps {
  liveratedata: CurrencyData[];
  selectedcurrencyiso: string;
  handleSelectionChange: (e: any) => void;
}

interface DropdownItemProps {
  key: string;
  label: string | JSX.Element;
  color?: "default" | "danger";
  onPress?: () => void;
  isCustom?: boolean;
}

interface CurrencyData {
  iso3: string;
  name: string;
  symbol: string;
}

export default function Nav() {
  const {
    isLoggedIn,
    handleLogout,
    liveratedata,
    handleSelectionChange,
    selectedcurrencyiso,
  } = useAuth();
  const router = useRouter();
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    if (called && !isLoggedIn) {
      router.push("/login");
      setCalled(false);
    }
  }, [called, isLoggedIn, router]);

  const placeholders = useMemo(
    () => [
      "Enlightened Buddha statues",
      "Lotus Buddha sculpture",
      "Bodhisattva figurines",
      "Zen garden decor",
      "Meditating monk statues",
      "Tibetan prayer wheels",
      "Golden Pagoda sculptures",
      "Incense holders",
      "Mala beads and bracelets",
      "Thangka paintings",
      "Buddhist ritual items",
      "Zen garden accessories",
      "Tibetan singing bowls",
      "Mudra hand gestures",
      "Buddhist prayer flags",
      "Enlightenment artwork",
      "Buddhist meditation aids",
      "Dharma teachings",
      "Buddhist wisdom books",
      "Sacred Bodhi tree art",
    ],
    []
  );

  const handleLogoutWithCall = useCallback(() => {
    handleLogout();
    setCalled(true);
  }, [handleLogout]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Navbar className="bg-background/20 z-50">
        <NavbarContent>
          <NavbarBrand className="max-w-[150px]">
            <Link
              href="/"
              aria-current="page"
              className="flex items-center justify-center"
            >
              <AcmeLogo />
              <p className="font-bold text-foreground">E-com</p>
            </Link>
          </NavbarBrand>
          <NavbarItem className="hidden sm:flex">
            <ShopMenu />
          </NavbarItem>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onSubmit={onSubmit}
          />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarContent className="hidden mmd:flex gap-4" justify="center">
            {liveratedata && (
              <CurrencySelector
                liveratedata={liveratedata}
                selectedcurrencyiso={selectedcurrencyiso}
                handleSelectionChange={handleSelectionChange}
              />
            )}
            {/* <NavbarItem>
              <Link color="foreground" href="/contact">
                Contact Us
              </Link>
            </NavbarItem> */}
          </NavbarContent>
          <Link href="/collections/wishlist">
            <IoMdHeartEmpty size={24} />
          </Link>
          <AddtoCart />
          {!isLoggedIn ? (
            <>
              <NavbarItem>
                <Link href="/login">Sign Up</Link>
              </NavbarItem>
            </>
          ) : (
            <></>
            // <NotificationsDropdown />
          )}
          {isLoggedIn && (
            <UserDropdown handleLogoutWithCall={handleLogoutWithCall} />
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  liveratedata,
  selectedcurrencyiso,
  handleSelectionChange,
}) => (
  <Select
    variant="bordered"
    items={liveratedata}
    selectedKeys={[selectedcurrencyiso]}
    onChange={handleSelectionChange}
    placeholder="Country / Region"
    className="max-w-xs min-w-[200px]"
    classNames={{
      label: "group-data-[filled=true]:-translate-y-5",
      trigger: "border-none",
      listboxWrapper: "max-h-[400px] ",
    }}
    listboxProps={{
      itemClasses: {
        base: [
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-default-100",
          "dark:data-[hover=true]:bg-default-50",
          "data-[selectable=true]:focus:bg-default-50",
          "data-[pressed=true]:opacity-70",
          "data-[focus-visible=true]:ring-default-500",
        ],
      },
    }}
    popoverProps={{
      classNames: {
        base: "before:bg-default-200",
        content:
          "p-0 border-small border-divider bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black backdrop-blur-md",
      },
    }}
    renderValue={(items) => {
      return items.map((item) => (
        <div className="flex gap-2 items-center" key={item?.data?.iso3}>
          <Avatar
            alt={item?.data?.iso3}
            className="flex-shrink-0"
            size="sm"
            name={item?.data?.symbol}
          />
          <div className="flex flex-col text-white">
            <span className="text-base">{item?.data?.name}</span>
          </div>
        </div>
      ));
    }}
  >
    {(liveratedata) => (
      <SelectItem
        key={liveratedata.iso3}
        textValue={liveratedata.name}
        className="transparent backdrop-blur-md"
      >
        <div className="flex gap-2 items-center">
          <Avatar
            alt={liveratedata.iso3}
            className="flex-shrink-0"
            size="sm"
            name={liveratedata.symbol}
          />
          <div className="flex flex-col">
            <span className="text-base">{liveratedata.name}</span>
          </div>
        </div>
      </SelectItem>
    )}
  </Select>
);

const UserDropdown: React.FC<UserDropdownProps> = ({
  handleLogoutWithCall,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData>();
  const { data, isLoading } = useGetLoggedUserQuery({});
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const signedInAsItem: DropdownItemProps = {
    key: "signed-in-as",
    label: (
      <div className="h-10 gap-2">
        <p className="">Signed in as</p>
        <p className="">{user?.username}</p>
      </div>
    ),
    isCustom: true,
  };

  const adminPanelItem: DropdownItemProps = {
    key: "admin_panel",
    label: "Dashboard",
    color: "default",
    onPress: () => router.push("/admin"),
  };

  const regularItems: DropdownItemProps[] = [
    {
      key: "profile",
      label: "Settings",
      color: "default",
      onPress: () => router.push("/settings"),
    },
    {
      key: "configurations",
      label: "My Wishlist",
      color: "default",
      onPress: () => {}, // Add your onPress logic here
    },
    {
      key: "help_and_feedback",
      label: "Help & Feedback",
      color: "default",
      onPress: () => router.push("/help"),
    },
    {
      key: "logout",
      label: "Log Out",
      color: "danger",
      onPress: handleLogoutWithCall,
    },
  ];

  const items: DropdownItemProps[] = [signedInAsItem];

  if (user?.role === "Admin" || user?.role === "Staff") {
    items.push(adminPanelItem);
  }

  items.push(...regularItems);

  function truncateEmail(email: string, maxLength: number = 5): string {
    const [username, domain] = email.split("@");
    if (username.length > maxLength) {
      return `${username.substring(0, maxLength)}...@${domain}`;
    }
    return email;
  }
  return (
    <div className="items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          {isLoading ? (
            <div className="max-w-[300px] w-full flex items-center gap-2">
              <div>
                <Skeleton className="flex rounded-md w-10 h-10" />
              </div>
              <div className="w-20 flex-col gap-2 hidden md:flex">
                <Skeleton className="h-3 w-3/5 rounded-md" />
                <Skeleton className="h-3 w-4/5 rounded-md" />
              </div>
            </div>
          ) : (
            <span className="flex gap-2">
              <Avatar
                radius="md"
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
                  icon: "text-black/80 cursor-pointer",
                }}
                src={user?.profile ? user?.profile : ""}
              />
              <span className="flex-col cursor-pointer text-xs justify-center hidden md:flex">
                <p>{user?.first_name}</p>
                <p className="text-default-500">
                  {user?.email ? truncateEmail(user.email) : ""}
                </p>
              </span>
            </span>
          )}
        </DropdownTrigger>
        <div className="fixed z-50">
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            disabledKeys={["signed-in-as"]}
          >
            {items.map((item) => (
              <DropdownItem
                key={item.key}
                onPress={item.onPress}
                {...(!item.isCustom && { color: item.color })}
                className={item.color === "danger" ? "text-danger" : ""}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};
