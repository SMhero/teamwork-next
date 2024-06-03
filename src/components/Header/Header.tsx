"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { logout } from "@/actions/logout";
import { routes } from "@/config/app";
import { Profile } from "@/types/profile";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<Profile>(["profile"]);

  const isActive = (href: string) => pathname === href;

  const onLogout = () => {
    logout().then(() => queryClient.removeQueries({ queryKey: ["profile"], exact: true }));

    router.refresh();
  };

  const renderMenuBlock = () => (
    <>
      <NavbarBrand className="mr-6 max-w-[100px]">
        <span className="text-xl">teamwork.</span>
      </NavbarBrand>
      <NavbarContent justify="start">
        {profile && (
          <>
            <NavbarItem>
              <Link color="foreground" href={routes.team} underline={isActive(routes.team) ? "always" : "none"}>
                Team
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href={routes.meetings} underline={isActive(routes.meetings) ? "always" : "none"}>
                Meetings
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </>
  );

  return (
    <Navbar position="static" isBordered maxWidth="xl">
      {renderMenuBlock()}
      {profile && (
        <NavbarContent className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: profile?.teamlead?.photoUrl,
                }}
                className="transition-transform"
                description={<span className="hidden md:inline text-sm">{profile?.team}</span>}
                name={
                  <span className="hidden md:inline text-sm">
                    {profile.firstName} {profile.lastName}
                  </span>
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings" href={routes.settings}>
                Settings
              </DropdownItem>
              <DropdownItem key="password">Change password</DropdownItem>
              <DropdownItem key="billing">Billing</DropdownItem>
              <DropdownItem key="help_and_feedback" showDivider>
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="upgrade" className="text-success">
                Upgraged plan
              </DropdownItem>
              <DropdownItem key="logout" className="text-danger" onClick={onLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
