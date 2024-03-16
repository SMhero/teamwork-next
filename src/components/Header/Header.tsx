"use client";

import Image from "next/image";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useZustandStore } from "@/components/providers/ZustandProvider";

export default function Header() {
  const router = useRouter();
  const { profile, removeProfile } = useZustandStore(state => state);
  const hasProfile = !!profile;

  const onLogout = () => {
    logout().then(() => removeProfile());

    router.refresh();
  };

  return (
    <Navbar position="static" isBordered>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Image src="./next.svg" alt="Next.js Logo" className="dark" width={100} height={24} priority />
          </NavbarBrand>
        </NavbarContent>
        {hasProfile && (
          <NavbarContent as="div" className="items-center" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar isBordered as="button" className="transition-transform" size="sm" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="team_settings">Settings</DropdownItem>
                <DropdownItem key="settings">Billing</DropdownItem>
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
    </Navbar>
  );
}
