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
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useZustandStore } from "@/components/Provider/ZustandProvider";

export default function Header() {
  const router = useRouter();
  const { profile, clearProfile } = useZustandStore(state => state);
  const isUserAuthorized = Boolean(profile);

  const onLogout = () => {
    logout().then(() => clearProfile());

    router.refresh();
  };

  const renderMenuBlock = () => (
    <NavbarContent>
      <NavbarItem className="mr-6">
        <Image
          className="dark bg-black rounded-md max-w-11"
          src="./wwe.svg"
          alt="WWE"
          width={100}
          height={24}
          priority
        />
      </NavbarItem>
      {isUserAuthorized && (
        <>
          <NavbarItem>
            <Link color="foreground" href="#">
              Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Meetings
            </Link>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );

  return (
    <Navbar position="static" isBordered maxWidth="xl">
      {renderMenuBlock()}
      {isUserAuthorized && (
        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: profile?.teamlead?.photoUrl,
                }}
                className="transition-transform"
                // @FIX: mocking in progress
                // `@${profile.user.lastName.toLocaleLowerCase()}`
                description={profile?.team}
                name={`${profile?.user.firstName} ${profile?.user.lastName}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="organization">{profile?.team}</DropdownItem>
              <DropdownItem key="team_settings">Settings</DropdownItem>
              <DropdownItem key="settings">Change password</DropdownItem>
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
