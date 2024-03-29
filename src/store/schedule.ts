import { StateCreator } from "zustand/vanilla";
import { ZustandStore } from "@/components/Provider/ZustandProvider";

type Meeting = {
  duration: number;
  guests: string[];
  meetingTitle: string;
  time: Date;
};

export type Schedule = {
  schedule: {
    [id: number]: {
      duration: number;
      guests: string[];
      meetingTitle: string;
      time: Date;
    }[];
  };
};

export type ScheduleState = {
  schedule: Schedule | null;
};

export type ScheduleActions = {
  updateSchedule: (id: number, meeting: Meeting) => void;
};

export type ScheduleStore = ScheduleState & ScheduleActions;

const initialState: ScheduleState = {
  schedule: null,
};

export const createScheduleStore: StateCreator<ZustandStore, [], [], ScheduleStore> = set => ({
  ...initialState,

  updateSchedule: (id: number, meeting: Meeting) =>
    set(state => ({
      ...state,
      [id]: meeting,
    })),
});
