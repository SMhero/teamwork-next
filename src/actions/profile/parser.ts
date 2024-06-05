import { Profile } from "@/types/profile";
import { z } from "zod";

export const ProfileSchema = z.object({
  team: z.object({
    name: z.string(),
  }),
  teamlead: z
    .object({
      default_meeting_duration: z.number(),
      photo: z.string(),
      timezone: z.string(),
    })
    .optional(),
  user: z.object({
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

export type RawProfile = z.infer<typeof ProfileSchema>;

export const getParsedProfile = (data: RawProfile): Profile => {
  const result: Profile = {
    email: data.user.email,
    firstName: data.user.first_name,
    lastName: data.user.last_name,
    team: data.team.name,
  };

  if (data.teamlead) {
    result.defaultMeetingDuration = data.teamlead.default_meeting_duration;
    result.photoUrl = data.teamlead?.photo ? `http://localhost:8000${data.teamlead?.photo}` : "";
    result.timezone = data.teamlead?.timezone;
  }

  return result;
};
