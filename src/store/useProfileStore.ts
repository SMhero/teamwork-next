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

type State = {
  profile: Profile | null;
  remove: () => void;
  update: (newProfile: Profile) => void;
};

export const useProfileStore = create<State>()(
  middlewares(
    set => ({
      profile: null,

      update: (newProfile: Profile) =>
        set(state => {
          state.profile = newProfile;
          return state;
        }),

      remove: () =>
        set(state => {
          state.profile = null;
          return state;
        }),
    }),
    {
      name: "profile-store",
    }
  )
);
