import middlewares from "@/store/zustand";
import { create } from "zustand";

export type Profile = {
  team: string;
  teamlead: {
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

export type State = {
  profile: Profile | null;
  removeProfile: () => void;
  setProfile: (newProfile: Profile) => void;
};

export const useProfileStore = create<State>()(
  middlewares(
    set => ({
      profile: null,

      setProfile: (newProfile: Profile) =>
        set(() => ({
          profile: newProfile,
        })),

      removeProfile: () =>
        set(state => {
          state.profile = null;
          return state;
        }),
    }),
    {
      name: "profile-store",
      skipHydration: true,
    }
  )
);
