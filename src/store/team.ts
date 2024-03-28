import { ZustandStore } from "@/components/Provider/ZustandProvider";
import { StateCreator } from "zustand";

export type Teammate = {
  id: number;
  name: string;
  photo: string;
  position: string;
  teamId: number;
  teamName: string;
};

export type Team = Teammate[];

export type TeamState = {
  teamlist: Team | null;
};

export type TeamActions = {
  setTeam: (team: Team) => void;
};

export type TeamStore = TeamState & TeamActions;

const initialState: TeamState = {
  teamlist: null,
};

export const createTeamStore: StateCreator<ZustandStore, [], [], TeamStore> = set => ({
  ...initialState,

  setTeam: (team: Team) =>
    set(state => {
      state.teamlist = team;
      return state;
    }),
});
