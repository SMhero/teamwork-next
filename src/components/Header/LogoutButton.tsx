"use client";

import { logout } from "@/actions/logout";
import { useZustandStore } from "@/components/providers/ZustandProvider";
import { DropdownItem } from "@nextui-org/react";
import { useRouter } from "next/router";

export function LogoutButton() {
  const { clearProfile } = useZustandStore(state => state);
  const router = useRouter();

  const onLogout = () => {
    logout().then(() => clearProfile());
    router.reload();
  };

  return (
    <DropdownItem key="logout" className="text-danger" onClick={onLogout}>
      Log Out
    </DropdownItem>
  );
}
