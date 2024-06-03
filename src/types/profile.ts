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
