"use client";

import Image from "next/image";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useZustandStore } from "@/components/Provider/ZustandProvider";

export default function Header() {
  const router = useRouter();
  const { profile, clearProfile } = useZustandStore(state => state);
  const hasProfile = !!profile;

  const onLogout = () => {
    logout().then(() => clearProfile());

    router.refresh();
  };

  return (
    <Navbar position="static" isBordered maxWidth="xl">
      <NavbarContent>
        <NavbarItem className="mr-6">
          <Image src="./next.svg" alt="Next.js Logo" className="dark" width={100} height={24} priority />
        </NavbarItem>
        {hasProfile ? (
          <>
            <NavbarItem>
              <Link color="primary" href="#">
                Team
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="primary" href="#">
                Meetings
              </Link>
            </NavbarItem>
          </>
        ) : (
          <Skeleton className="h-3 w-3/12 rounded-lg" />
        )}
      </NavbarContent>
      {hasProfile ? (
        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: profile.teamlead?.photoUrl,
                }}
                className="transition-transform"
                // @FIX: mocking in progress
                // `@${profile.user.lastName.toLocaleLowerCase()}`
                description={profile.team}
                name={`${profile.user.firstName} ${profile.user.lastName}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="team_settings">Settings</DropdownItem>
              <DropdownItem key="settings">Change password</DropdownItem>
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
      ) : (
        <div className="max-w-[268px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      )}
    </Navbar>
  );
}
