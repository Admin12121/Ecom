import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { CommentIcon } from "../icons/sidebar/commenticon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { OdersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[50] sticky top-0 scroll">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon isActive={pathname === "/admin"} />}
              isActive={pathname === "/admin"}
              href="/admin"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/admin/users"}
                title="Users"
                icon={<AccountsIcon isActive={pathname === "/admin/users"} />}
                href="/admin/users"
              />
              <SidebarItem
                isActive={pathname === "/admin/products"}
                title="Products"
                icon={<ProductsIcon isActive={pathname === "/admin/products"}/>}
                href="/admin/products"
              />
              <SidebarItem
                isActive={pathname === "/admin/review&comments"}
                title="Review and Comments"
                icon={<CommentIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                href={["profile"]}
                title="Transactions"
              />
              <SidebarItem
                isActive={pathname === "/admin/oders"}
                title="Oders"
                icon={<OdersIcon isActive={pathname === "/admin/oders"}/>}
              />
              <SidebarItem
                isActive={pathname === "/admin/reports"}
                title="Reports"
                icon={<ReportsIcon isActive={pathname === "/admin/reports"}/>}
              />
              <SidebarItem
                isActive={pathname === "/admin/settings"}
                title="Settings"
                icon={<SettingsIcon isActive={pathname === "/admin/settings"}/>}
              />
            </SidebarMenu>

          </div>
        </div>
      </div>
    </aside>
  );
};
