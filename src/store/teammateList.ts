import { createStore } from "zustand/vanilla";
import middlewares from "@/store/zustand";

export type Teammate = {
  id: number;
  name: string;
  photo: string;
  position: string;
  teamId: number;
  teamName: string;
};

export type TeammateList = Teammate[];

export type TeammateListState = {
  teammateList: TeammateList | null;
};

export type TeammateListActions = {
  setTeam: (teammateList: TeammateList) => void;
};

export type TeammateListStore = TeammateListState & TeammateListActions;

const defaultInitState: TeammateListState = {
  teammateList: null,
};

export const createTeammateListStore = (initState: TeammateListState = defaultInitState) => {
  return createStore<TeammateListStore>()(
    middlewares(
      set => ({
        ...initState,
        setTeam: (team: TeammateList) =>
          set(state => {
            state.teammateList = team;
            return state;
          }),
      }),
      {
        name: "teammate-list-store",
      }
    )
  );
};
