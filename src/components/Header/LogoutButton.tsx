"use client";

import { logout } from "@/actions/logout";
import { useProfileStore } from "@/store/useProfileStore";
import { DropdownItem } from "@nextui-org/react";
import { useRouter } from "next/router";

export function LogoutButton() {
  const router = useRouter();

  const onLogout = () => {
    logout().then(() => useProfileStore.getState().removeProfile());
    router.reload();
  };

  return (
    <DropdownItem key="logout" className="text-danger" onClick={onLogout}>
      Log Out
    </DropdownItem>
  );
}
