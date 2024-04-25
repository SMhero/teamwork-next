"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { type ProfileStore, type ProfileState, createProfileStore } from "@/store/profile";

export type ZustandStore = ProfileStore;

type Props = {
  children: React.ReactNode;
  initalValues?: Partial<ProfileState>;
};

const ZustandContext = createContext<StoreApi<ZustandStore> | null>(null);

export const ZustandProvider = ({ children, initalValues }: Props) => {
  const storeRef = useRef<StoreApi<ZustandStore>>();

  if (!storeRef.current) {
    storeRef.current = createProfileStore();
  }

  useEffect(() => {
    if (initalValues) {
      storeRef.current?.setState(initalValues);
    }
  }, [initalValues]);

  return <ZustandContext.Provider value={storeRef.current}>{children}</ZustandContext.Provider>;
};

export const useZustandStore = <T,>(selector: (state: ZustandStore) => T): T => {
  const store = useContext(ZustandContext);

  if (!store) {
    throw new Error("Missing ZustandContext.Provider in the tree");
  }

  return useStore(store, selector);
};
