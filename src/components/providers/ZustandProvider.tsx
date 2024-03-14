"use client";

import { createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createContext, useContext, useRef } from "react";
import middlewares from "@/store/zustand";

import { Profile, State as ProfileState } from "@/store/useProfileStore";

type ZustandStore = ReturnType<typeof createZustandStore>;
interface ZustandState extends ProfileState {}

const createZustandStore = () => {
  return createStore<ZustandState>()(
    middlewares(
      set => ({
        profile: null,
        setProfile: (profile: Profile) => set(() => ({ profile })),
        removeProfile: () => set(() => ({ profile: null })),
      }),
      {
        name: "zustand-store",
        skipHydration: true,
      }
    )
  );
};

const ZustandContext = createContext<ZustandStore>({} as ZustandStore);

export const ZustandProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ZustandStore>();

  if (!storeRef.current) {
    storeRef.current = createZustandStore();
  }

  return <ZustandContext.Provider value={storeRef.current}>{children}</ZustandContext.Provider>;
};

export const useZustandStore = <T,>(selector: (state: ProfileState) => T): T => {
  const store = useContext(ZustandContext);

  if (!store) {
    throw new Error("Missing ZustandContext.Provider in the tree");
  }

  return useStoreWithEqualityFn(store, selector);
};
