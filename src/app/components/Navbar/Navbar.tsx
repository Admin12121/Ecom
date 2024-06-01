"use client"
import { useState , useEffect} from "react";
import {Navbar,Badge, NavbarBrand,NavbarMenuToggle,Input, NavbarContent,useDisclosure, NavbarItem, NavbarMenu,NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, User} from "@nextui-org/react";
import {ChevronDown, SearchIcon, Lock, Activity, Flash, Server, TagUser, Scale} from "./Icons";
import { AcmeLogo } from "./AcmeLogo";
import  { Login }  from "../Login/Login"
import { CartIcon } from "./CartIcon";
import { CardModal } from "./CardModal";
import {PlaceholdersAndVanishInput} from "../SearchBox/Search"
import Link from 'next/link'
import { getToken } from '@/lib/store/Service/LocalStorageServices';
import { useDispatch } from "react-redux";
import { toast } from 'sonner';
import { unSetUserToken } from '@/lib/store/Feature/authSlice';
import { removeToken } from '@/lib/store/Service/LocalStorageServices';
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [logoutTrigger, setLogoutTrigger] = useState<number>(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const { access_token } = getToken();
    setIsLoggedIn(!!access_token);
  }, [logoutTrigger]);

  const handleLogout = () => {
    dispatch(unSetUserToken());
    removeToken();
    toast.success("Logged out")
    setLogoutTrigger(prev => prev + 1);
  };
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
    "What is what?",
    "Who is what?",
    "Where is what?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Navbar className="bg-background/20 z-50" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="max-w-[150px]">
            <Link href="/" aria-current="page" className="flex items-center justify-center">
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
            <Dropdown>
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
                  href="catalog"
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
            </Dropdown>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Our Story
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/contact">
                Contact Us
              </Link>
            </NavbarItem>
          </NavbarContent>
          {!isLoggedIn && (<>
            {/* <NavbarItem className="hidden lg:flex">
              <Link href="#" color="secondary" onClick={onOpen}>
                Login
              </Link>
            </NavbarItem> */}
            <NavbarItem>
              <Link href="/login">
                Sign Up
              </Link>
            </NavbarItem>
          </>)}
             <AddtoCart/>
             {isLoggedIn && (<>
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                      }}
                      className="transition-transform"
                      description="@tonyreichert"
                      name="Tony Reichert"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      My Settings
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">
                      Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
             </>)}
        </NavbarContent>
        <NavbarMenu  className="overflow-hidden">
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


const AddtoCart = () =>{
  const {isOpen, onOpen, onClose} = useDisclosure();
  return(
    <>
      <NavbarItem className="cursor-pointer" onClick={onOpen}>
        <Badge color="danger" content={0} shape="circle">
              <CartIcon size={30} />
        </Badge>
      </NavbarItem>
      <CardModal isOpen={isOpen} onClose={onClose}/>
    </>
  )
}