"use client";

import { createContext, useContext, useRef } from "react";
import { createStore, type StoreApi } from "zustand/vanilla";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createJSONStorage } from "zustand/middleware";

import { type ProfileStore, createProfileStore } from "@/store/profile";
import { createTeamStore, TeamStore } from "@/store/team";
import { type ScheduleStore, createScheduleStore } from "@/store/schedule";
import middlewares from "@/store/zustand";

export type ZustandStore = ProfileStore & TeamStore & ScheduleStore;

const ZustandContext = createContext<StoreApi<ZustandStore> | null>(null);

export const ZustandProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<ZustandStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore<ZustandStore>()(
      middlewares(
        (...args) => ({
          ...createProfileStore(...args),
          ...createTeamStore(...args),
          ...createScheduleStore(...args),
        }),
        {
          name: "zustand-store",
          storage: createJSONStorage(() => localStorage),
          skipHydration: true,
        }
      )
    );
  }

  return <ZustandContext.Provider value={storeRef.current}>{children}</ZustandContext.Provider>;
};

export const useZustandStore = <T,>(selector: (state: ZustandStore) => T): T => {
  const store = useContext(ZustandContext);

  if (!store) {
    throw new Error("Missing ZustandContext.Provider in the tree");
  }

  return useStoreWithEqualityFn(store, selector);
};
