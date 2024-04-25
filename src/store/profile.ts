import middlewares from "@/store/zustand";
import { createJSONStorage } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type Profile = {
  email: string;
  firstName: string;
  lastName: string;
  team: string;
  teamlead?: {
    defaultMeetingDuration: number;
    photoUrl: string;
    timezone: string;
  };
};

export type ProfileState = {
  profile: Profile | null | undefined;
};

export type ProfileActions = {
  clearProfile: () => void;
  setProfile: (newProfile: Profile) => void;
};

export type ProfileStore = ProfileState & ProfileActions;

const defaultInitState: ProfileState = {
  profile: null,
};

export const createProfileStore = (initState: ProfileState = defaultInitState) => {
  return createStore<ProfileStore>()(
    middlewares(
      set => ({
        ...initState,
        setProfile: (newProfile: Profile) =>
          set(() => ({
            profile: newProfile,
          })),
        clearProfile: () =>
          set(state => {
            state.profile = null;
            return state;
          }),
      }),
      {
        name: "profile-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
