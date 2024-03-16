import { ZustandStore } from "@/components/providers/ZustandProvider";
import middlewares from "@/store/zustand";
import { createJSONStorage } from "zustand/middleware";
import { StateCreator, createStore } from "zustand/vanilla";

export type Profile = {
  team: string;
  teamlead?: {
    defaultMeetingDuration: number;
    photoUrl: string;
    timezone: string;
  };
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type ProfileState = {
  profile: Profile | null;
};

export type ProfileActions = {
  clearProfile: () => void;
  setProfile: (newProfile: Profile) => void;
};

export type ProfileStore = ProfileState & ProfileActions;

const initialState: ProfileState = {
  profile: null,
};

export const createProfileStore: StateCreator<ZustandStore, [], [], ProfileStore> = set => ({
  ...initialState,

  setProfile: (newProfile: Profile) =>
    set(() => ({
      profile: newProfile,
    })),

  clearProfile: () =>
    set(state => {
      state.profile = null;
      return state;
    }),
});
