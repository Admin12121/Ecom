"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Kbd from "@/components/ui/kbd";
import { Slot } from "@radix-ui/react-slot";
import { cn, getCookie } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { VariantProps, cva } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight,
  LucideIcon,
  ChevronsUpDown,
  Search,
  Ellipsis,
} from "lucide-react";

import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  navCollapsedSize?: number;
  children: React.ReactNode;
}

interface SidebarContextType {
  provider: boolean;
  isCollapsed: boolean;
  links?: SidebarNavProps["links"];
  SetLinks?: any;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

const Sidebar = ({
  navCollapsedSize = 4,
  children,
}: SidebarProps) => {
  const layout = getCookie("react-resizable-panels:layout:mail");
  const collapsed = getCookie("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout) : [20, 80];
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : false;

  const [links, SetLinks] = React.useState<SidebarNavProps["links"]>();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [maxSize, setMaxSize] = React.useState(20);

  const handleResize = React.useCallback(() => {
    const width = window.innerWidth;
    let maxSizeValue;
    if (width <= 1200 && width >= 768) {
      maxSizeValue = 35 - ((width - 768) / (1200 - 768)) * 10;
    } else {
      maxSizeValue = 20;
    }
    setMaxSize(maxSizeValue);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const sidebarNav = React.useMemo(() => {
    let nav: React.ReactNode = null;
    const content: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === SidebarContent) {
        nav = child;
      } else {
        content.push(child);
      }
    });
    return { nav, content };
  }, [children]);

  return (
    <SidebarContext.Provider
      value={{ provider: true, isCollapsed, links, SetLinks }}
    >
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch max-w-[2400px]"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
              sizes
            )}`;
          }}
        >
          {sidebarNav.nav && (
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              collapsedSize={navCollapsedSize}
              collapsible={true}
              minSize={15}
              maxSize={maxSize}
              onCollapse={() => {
                setIsCollapsed(true);
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                  true
                )}`;
              }}
              onResize={() => {
                setIsCollapsed(false);
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                  false
                )}`;
              }}
              className={cn(
                "p-2 max-md:hidden h-[100dvh] min-w-[170px]",
                isCollapsed &&
                  "min-w-[68px] transition-all duration-300 ease-in-out"
              )}
            >
              {sidebarNav.nav}
            </ResizablePanel>
          )}
          {sidebarNav.nav && (
            <ResizableHandle className="bg-transparent w-2 max-md:hidden" />
          )}
          <ResizablePanel>
            {sidebarNav.content}
            <Navigationbar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

interface SublinkMenu {
  title: string;
  href?: string;
  variant?: "default" | "ghost";
  className?: string;
  icon?: LucideIcon;
}

interface Sublink {
  title: string;
  href?: string;
  variant?: "default" | "ghost";
  className?: string;
  menu?: SublinkMenu[];
}

interface SidebarNavProps {
  links: {
    group?: string;
    title: string;
    label?: string;
    icon: LucideIcon;
    href?: string;
    className?: string;
    variant?: "default" | "ghost";
    prefetch?: boolean;
    subLinks?: Sublink[];
    collapsible?: boolean;
    isactive?: boolean;
  }[];
  children: React.ReactNode;
  className?: string;
  container?: string;
}

const SidebarContent = ({
  links,
  children,
  className,
  container,
}: SidebarNavProps) => {
  const context = React.useContext(SidebarContext);
  const router = useRouter();
  const pathname = usePathname();
  if (!context) {
    throw new Error("SidebarContent must be used within a Sidebar component.");
  }

  const { isCollapsed, SetLinks } = context;

  React.useEffect(() => {
    if (context && links) {
      SetLinks(links);
    }
  }, [links, context]);

  const { headerContent, footerContent, SearchContent, mainContent } =
    React.useMemo(() => {
      let headerContent: React.ReactNode = null;
      let footerContent: React.ReactNode = null;
      let SearchContent: React.ReactNode = null;
      const mainContent: React.ReactNode[] = [];

      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SidebarHeader) {
            headerContent = child;
          } else if (child.type === SidebarFooter) {
            footerContent = child;
          } else if (child.type === CommandMenu) {
            SearchContent = child;
          } else {
            mainContent.push(child);
          }
        }
      });

      return { headerContent, footerContent, SearchContent, mainContent };
    }, [children]);

  const determineVariant = React.useCallback(
    (href: string | undefined): "default" | "ghost" => {
      return pathname === href ? "default" : "ghost";
    },
    [pathname]
  );
  return (
    <div
      className={cn(
        "rounded-lg dark:bg-[#0C0C0C] h-full relative w-full",
        container
      )}
    >
      {headerContent}
      {SearchContent}
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "group flex flex-col gap-4 data-[collapsed=true]:py-2 w-full overflow-hidden overflow-y-auto",
          {
            "h-[calc(100dvh-80px)]": !headerContent,
            "h-[calc(100dvh-70px)]": headerContent && !footerContent,
            "h-[calc(100dvh-130px)]": headerContent && footerContent,
            "h-[calc(100dvh-185px)]":
              headerContent && footerContent && SearchContent,
          },
          className
        )}
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 w-full">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href || "#"}
                        className={cn(
                          buttonVariants({
                            variant: determineVariant(link.href),
                            size: "icon",
                          }),
                          "h-9 w-9",
                          determineVariant(link.href) === "default" &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                          link.className
                        )}
                      >
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </TooltipTrigger>
                  </DropdownMenuTrigger>
                  {!link.href && link.subLinks && (
                    <DropdownMenuContent
                      className={cn(
                        "w-56 dark:bg-[#1B1B1B] border-0 outline-0",
                        isCollapsed && "relative",
                        "left-4"
                      )}
                      align="end"
                      forceMount
                    >
                      <DropdownMenuGroup>
                        {link.subLinks?.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} className="p-0">
                            <Link
                              href={subItem.href || "#"}
                              className={cn(
                                buttonVariants({
                                  variant: subItem.variant || "ghost",
                                  size: "sm",
                                }),
                                "flex items-center text-xs justify-start w-full hover:dark:!bg-neutral-900",
                                subItem.variant === "default" &&
                                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                subItem.className
                              )}
                            >
                              <span>{subItem.title}</span>
                              {subItem.menu && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                      <Ellipsis />
                                      <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    className="w-56 rounded-lg"
                                    side={"right"}
                                    align={"start"}
                                  >
                                    {subItem.menu.map((menu, index) => (
                                      <DropdownMenuItem
                                        key={index}
                                        onClick={() => {
                                          router.push(menu.href || "#");
                                        }}
                                      >
                                        {menu.icon && (
                                          <menu.icon className="w-4 h-4 mr-2" />
                                        )}
                                        <span>{menu.title}</span>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div key={index} className="w-full">
                {link.collapsible ? (
                  <SidebarMenu>
                    {link.group && (
                      <p className="text-xs mt-5 mb-2 px-3 font-medium">
                        {link.group}
                      </p>
                    )}
                    <Collapsible
                      asChild
                      defaultOpen={link.isactive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              buttonVariants({
                                variant: determineVariant(link.href) || "ghost",
                                size: "sm",
                              }),
                              determineVariant(link.href) === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                              "justify-start w-full",
                              link.className
                            )}
                          >
                            {link.icon && <link.icon />}
                            <span>{link.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {link.subLinks?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={subItem.href || "#"}
                                    className={cn(
                                      buttonVariants({
                                        variant: subItem.variant || "ghost",
                                        size: "sm",
                                      }),
                                      "flex items-center text-xs justify-start",
                                      subItem.variant === "default" &&
                                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                      subItem.className
                                    )}
                                  >
                                    <span>{subItem.title}</span>
                                    {subItem.menu && (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <SidebarMenuAction showOnHover>
                                            <Ellipsis />
                                            <span className="sr-only">
                                              More
                                            </span>
                                          </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                          className="w-56 rounded-lg"
                                          side={"right"}
                                          align={"start"}
                                        >
                                          {subItem.menu.map((menu, index) => (
                                            <DropdownMenuItem
                                              key={index}
                                              onClick={() => {
                                                router.push(menu.href || "#");
                                              }}
                                            >
                                              {menu.icon && (
                                                <menu.icon className="w-4 h-4 mr-2" />
                                              )}
                                              <span>{menu.title}</span>
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenu>
                ) : (
                  <div className="w-full">
                    {link.group && (
                      <p className="text-xs mt-5 mb-2 px-3 font-medium">
                        {link.group}
                      </p>
                    )}
                    <Link
                      href={link.href || "#"}
                      prefetch={link.prefetch ? link.prefetch : false}
                      className={cn(
                        buttonVariants({
                          variant: determineVariant(link.href),
                          size: "sm",
                        }),
                        determineVariant(link.href) === "default" &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                        "justify-start w-full",
                        link.className
                      )}
                    >
                      {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                      {link.title}
                      {link.label && (
                        <span
                          className={cn(
                            "ml-auto",
                            determineVariant(link.href) === "default" &&
                              "text-background dark:text-white"
                          )}
                        >
                          {link.label}
                        </span>
                      )}
                    </Link>
                    {link.subLinks && link.subLinks.length > 0 && (
                      <SidebarMenuSub>
                        {link.subLinks.map((subLink, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={subLink.href || "#"}
                                className={cn(
                                  "dark:hover:bg-zinc-800 flex items-center text-xs",
                                  subLink.className
                                )}
                              >
                                {subLink.title}
                                {subLink.menu && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <SidebarMenuAction showOnHover>
                                        <Ellipsis />
                                        <span className="sr-only">More</span>
                                      </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      className="w-56 rounded-lg"
                                      side={"right"}
                                      align={"start"}
                                    >
                                      {subLink.menu.map((menu, index) => (
                                        <DropdownMenuItem
                                          key={index}
                                          onClick={() => {
                                            router.push(menu.href || "#");
                                          }}
                                        >
                                          {menu.icon && (
                                            <menu.icon className="w-4 h-4 mr-2" />
                                          )}
                                          <span>{menu.title}</span>
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </nav>
      </div>
      {mainContent && mainContent}
      {footerContent && footerContent}
    </div>
  );
};

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));

SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));

SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center" {...tooltip} />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

interface HeaderProps {
  logo?: string;
  label?: string;
  menuItems?: {
    title: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
  }[];
  children?: React.ReactNode;
}

const SidebarHeader = ({ logo, label, children, menuItems }: HeaderProps) => {
  const router = useRouter();
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarHeader must be used within a Sidebar component.");
  }

  const { isCollapsed } = context;
  return (
    <>
      {children ? (
        children
      ) : (
        <div
          className={cn("relative flex h-[52px] items-center justify-center")}
        >
          <div
            className={cn(
              "relative flex items-center px-1 gap-0 w-full [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
              isCollapsed &&
                "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-start justify-start h-[50px] p-0 px-1",
                    isCollapsed && "px-0"
                  )}
                >
                  <div className="flex gap-2 items-center cursor-pointer w-full">
                    {logo && (
                      <div className="logo">
                        <span
                          className={cn(
                            "bg-white flex w-[40px] h-[40px] rounded-lg",
                            isCollapsed && "w-[36px] h-[36px]"
                          )}
                        >
                          <Image
                            src={logo || ""}
                            alt="logo"
                            width={45}
                            height={45}
                            className="object-contain"
                          />
                        </span>
                      </div>
                    )}
                    <h1
                      className={cn(
                        "font-semibold",
                        !logo && "px-2",
                        !logo && isCollapsed && "text-2xl"
                      )}
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {label && isCollapsed ? `${label.slice(0, 1)}` : label}
                    </h1>
                    {menuItems && menuItems.length > 0 && (
                      <ChevronsUpDown className="w-4 h-4 absolute right-3" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              {menuItems && menuItems.length > 0 && (
                <DropdownMenuContent
                  className={cn(
                    "w-56 dark:bg-muted border-0 outline-0",
                    isCollapsed && "relative",
                    "left-4"
                  )}
                  align="end"
                  forceMount
                >
                  <DropdownMenuGroup>
                    {menuItems.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="gap-2 hover:dark:!bg-neutral-900"
                        onClick={() => {
                          if (item.href) {
                            router.push(item.href);
                          } else if (item.onClick) {
                            item.onClick();
                          }
                        }}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

const SidebarFooter = ({
  data,
  left = true,
  menuItems = [],
  children,
  className,
}: {
  data?: any;
  left?: boolean;
  className?: string;
  menuItems?: {
    title: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
  }[];
  children?: React.ReactNode;
}) => {
  const context = React.useContext(SidebarContext);
  const router = useRouter();

  if (!context) {
    throw new Error("SidebarHeader must be used within a Sidebar component.");
  }

  if (children) {
    return <div className={cn("absolute bottom-0", className)}>{children}</div>;
  }

  const { isCollapsed } = context;
  return (
    <>
      <div
        className={cn(
          "flex h-[52px] items-center justify-center bottom-1 absolute w-full backdrop-blur-md",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className={cn(
                "relative h-11 w-full p-1 rounded-md flex items-center justify-start",
                isCollapsed && "h-9 w-9 p-0 justify-center"
              )}
            >
              <div className="flex items-center space-x-4">
                <Avatar
                  className={cn(
                    "h-9 w-9 rounded-md bg-white",
                    isCollapsed && "h-8 w-8 p-0"
                  )}
                >
                  <AvatarImage src="/logo.png" />
                  <AvatarFallback className="bg-transparent">OM</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex items-start justify-start flex-col",
                    isCollapsed && "hidden"
                  )}
                >
                  <p className="text-sm font-medium text-muted-foreground leading-none">
                    {data?.name}
                  </p>
                  <p className="text-xs text-zinc-600">{data?.email}</p>
                </div>
                {menuItems.length > 0 && (
                  <ChevronsUpDown className="w-4 h-4 absolute right-3" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          {menuItems.length > 0 && (
            <DropdownMenuContent
              className={cn(
                "w-56 dark:bg-muted border-0 outline-0",
                isCollapsed && "relative",
                left ? "left-4" : "-top-2"
              )}
              align="end"
              forceMount
            >
              <DropdownMenuGroup>
                {menuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="gap-2 hover:dark:!bg-neutral-900"
                    onClick={() => {
                      if (item.href) {
                        router.push(item.href);
                      } else if (item.onClick) {
                        item.onClick();
                      }
                    }}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </>
  );
};

const Navigationbar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("Navigationbar must be used within a Sidebar component.");
  }

  const { links } = context;
  const router = useRouter();
  const pathname = usePathname();
  const [activeLinkIndex, setActiveLinkIndex] = React.useState<number | null>(
    null
  );

  const determineVariant = (href: string | undefined): "default" | "ghost" => {
    return pathname === href ? "default" : "ghost";
  };

  const handleLinkClick = (index: number, link: any) => {
    if (link.href) {
      router.push(link.href);
      setActiveLinkIndex(null);
    } else if (link.subLinks) {
      setActiveLinkIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  return (
    <div className="fixed w-full bottom-0 h-0 max-md:flex hidden  items-center justify-center z-50 ">
      <div className="fixed rounded-lg bottom-2 flex backdrop-blur-md flex-col gap-1 justify-center items-center ">
        <AnimatePresence>
          {activeLinkIndex !== null && (
            <motion.div
              className="relative rounded-[inherit] backdrop-blur-md flex overflow-hidden dark:bg-neutral-900/70 w-full border-[1px]"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="p-1 w-full">
                {links && links[activeLinkIndex].subLinks && (
                  <motion.div className="flex flex-col w-full">
                    {links[activeLinkIndex].subLinks.map(
                      (subLink, subIndex) => (
                        <Button
                          asChild
                          className="justify-start"
                          variant="ghost"
                          key={subIndex}
                        >
                          <Link href={subLink.href || "#"}>
                            {subLink.title}
                          </Link>
                        </Button>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-1 p-1 rounded-lg relative h-[45px] backdrop-blur-md justify-center items-center dark:bg-neutral-900/50 border-[2px] ">
          {links &&
            links.map((link, index) => (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => handleLinkClick(index, link)}
                    className={cn(
                      buttonVariants({
                        variant: determineVariant(link.href),
                        size: "icon",
                      }),
                      "h-9 w-9",
                      determineVariant(link.href) === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    <span className="sr-only">{link.title}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
        </div>
      </div>
    </div>
  );
};

const CommandMenu = ({ children }: { children?: React.ReactNode }) => {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarHeader must be used within a Sidebar component.");
  }

  const { isCollapsed } = context;
  return (
    <>
      {children ? (
        children
      ) : (
        <div className="p-2">
          <div
            className={`relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg ${
              isCollapsed ? "w-[36px] h-[36px]" : "w-full"
            }`}
          >
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Kbd
                    keys={["command"]}
                    className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
                  ></Kbd>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  <span className="ml-auto text-muted-foreground">search</span>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="bg-white dark:bg-neutral-900 pl-8 border-0 focus:outline-none focus-visible:ring-0"
                />
                <Kbd
                  keys={["command"]}
                  className="rounded-md absolute right-1 top-[4px] shadow-lg bg-neutral-900 text-white"
                ></Kbd>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, CommandMenu };

export { SidebarContext };
