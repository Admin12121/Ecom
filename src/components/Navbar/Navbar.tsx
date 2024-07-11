"use client";
import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Badge,
  NavbarBrand,
  NavbarMenuToggle,
  Input,
  NavbarContent,
  useDisclosure,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  User,
} from "@nextui-org/react";
import {
  ChevronDown,
  SearchIcon,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./Icons";
import { useCart } from '@/context/CartState';
import { AnimatePresence } from 'framer-motion';
import { AcmeLogo } from "./AcmeLogo";
import { Login } from "../Login/Login";
import { CartIcon } from "./CartIcon";
import { CardModal } from "./CardModal";
import { PlaceholdersAndVanishInput } from "../SearchBox/Search";
import Link from "next/link";
import useAuth from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cart from "../Cart/Cart";
import {Select, SelectItem} from "@nextui-org/react";
import { NotificationsDropdown } from "../Admin/navbar/notifications-dropdown";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoggedIn, handleLogout, liveratedata, handleSelectionChange ,selectedcurrencyiso} = useAuth();
  const router = useRouter();
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    if (called) {
      if (!isLoggedIn) {
        router.push(`/login`);
        setCalled(false);
      }
    }
  }, [called, isLoggedIn, router]);

  const icons = {
    chevron: <ChevronDown fill="currentColor" height={16} width={16} />,
    scale: (
      <Scale
        className="text-warning"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
    lock: (
      <Lock
        className="text-success"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
    activity: (
      <Activity
        className="text-secondary"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
    flash: (
      <Flash
        className="text-primary"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
    server: (
      <Server
        className="text-success"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
    user: (
      <TagUser
        className="text-danger"
        fill="currentColor"
        height={30}
        width={30}
      />
    ),
  };

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const placeholders = [
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
    "Sacred Bodhi tree art"
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Navbar
        className="bg-background/20 z-50"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
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
          {/* <Input
            classNames={{
              base: "max-w-full min-w-[400px] hidden sm:flex sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            endContent={<SearchIcon size={18} />}
            type="search"
          /> */}
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onSubmit={onSubmit}
          />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarContent className="hidden mmd:flex gap-4" justify="center">
            {/* <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    Statue
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  href="collections"
                  description="ACME scales apps to meet user demand, automagically, based on load."
                  startContent={icons.scale}
                >
                  Autoscaling
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
                  startContent={icons.activity}
                >
                  Usage Metrics
                </DropdownItem>
                <DropdownItem
                  key="production_ready"
                  description="ACME runs on ACME, join us and others serving requests at web scale."
                  startContent={icons.flash}
                >
                  Production Ready
                </DropdownItem>
                <DropdownItem
                  key="99_uptime"
                  description="Applications stay on the grid with high availability and high uptime guarantees."
                  startContent={icons.server}
                >
                  +99% Uptime
                </DropdownItem>
                <DropdownItem
                  key="supreme_support"
                  description="Overcome any challenge with a supporting team ready to respond."
                  startContent={icons.user}
                >
                  +Supreme Support
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            {liveratedata && <Select
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
                  content: "p-0 border-small border-divider bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black backdrop-blur-md",
                },
              }}              
              renderValue={(items) => {
                return items.map((item) => (
                  <div className="flex gap-2 items-center" key={item?.data?.iso3}>
                    <Avatar alt={item?.data?.iso3} className="flex-shrink-0" size="sm" name={item?.data?.symbol}/>
                    <div className="flex flex-col text-white">
                      <span className="text-base">{item?.data?.name}</span>
                    </div>
                  </div>
                ));
              }}              
            >
              {(liveratedata) => (
                <SelectItem key={liveratedata?.iso3} textValue={liveratedata?.name} className="transparent backdrop-blur-md">
                  <div className="flex gap-2 items-center">
                    <Avatar alt={liveratedata?.iso3} className="flex-shrink-0" size="sm" name={liveratedata.symbol}/>
                    <div className="flex flex-col">
                      <span className="text-base">{liveratedata?.name}</span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>    }        
            <NavbarItem>
              <Link color="foreground" href="#">
                Our Story
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/contact">
                Contact Us
              </Link>
            </NavbarItem>
          </NavbarContent>
          {!isLoggedIn ? (
            <>
              {/* <NavbarItem className="hidden lg:flex">
              <Link href="#" color="secondary" onClick={onOpen}>
                Login
              </Link>
            </NavbarItem> */}
              <NavbarItem>
                <Link href="/login">Sign Up</Link>
              </NavbarItem>
            </>
          ):
          <NotificationsDropdown/>
          }
          <AddtoCart />
          {isLoggedIn && (
            <>
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <span className="flex gap-2">
                      <Avatar
                        radius="md"
                        className="cursor-pointer"
                        src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
                      />
                      <span className="flex flex-col cursor-pointer text-xs justify-center">
                        <p>Admin</p>
                        <p className="text-default-500">admin@gmail.com</p>
                      </span>
                    </span>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem
                      key="profile"
                      onPress={() => {
                        router.push("/settings");
                      }}
                    >
                      Settings
                    </DropdownItem>
                    <DropdownItem key="configurations">
                       My Wishlist
                    </DropdownItem>
                    <DropdownItem
                      key="help_and_feedback"
                      onPress={() => {
                        router.push("/help");
                      }}
                    >
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      onPress={() => {
                        handleLogout();
                        setCalled(true);
                      }}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </>
          )}
        </NavbarContent>
        <NavbarMenu className="overflow-hidden">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

const AddtoCart = () => {
  const { counter } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isActive, setIsActive] = useState<boolean>(false);
  
  return (
    <>
      <NavbarItem onClick={() => {setIsActive(!isActive)}} className="cursor-pointer z-[100]" >
        <Badge color="secondary" id="js-shopping-bag-counter" content={counter} shape="circle">
          <CartIcon  size={30} />
        </Badge>
      </NavbarItem>
      <CardModal isOpen={isOpen} onClose={onClose} />
      <AnimatePresence mode="wait">
      {isActive && <Cart setIsActive={setIsActive} isActive={isActive}/>}
    </AnimatePresence>
    </>
  );
};
