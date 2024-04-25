"use server";

import { endpoints } from "@/config/app";
import { request } from "@/services/request";
import { Profile } from "@/store/profile";
import { cookies } from "next/headers";

import { z } from "zod";

const ProfileSchema = z.object({
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

type RawProfile = z.infer<typeof ProfileSchema>;

const getParsedProfile = (data: RawProfile): Profile => {
  const result: Profile = {
    email: data.user.email,
    firstName: data.user.first_name,
    lastName: data.user.last_name,
    team: data.team.name,
  };

  if (data.teamlead) {
    result.teamlead = {
      defaultMeetingDuration: data.teamlead.default_meeting_duration,
      photoUrl: data.teamlead?.photo ? `http://localhost:8000${data.teamlead?.photo}` : "",
      timezone: data.teamlead?.timezone,
    };
  }

  return result;
};

export const getProfile = async () => {
  const sessionId = cookies().get("sessionid")?.value;

  if (!sessionId) {
    return null;
  }

  const rawData = await request<RawProfile>(endpoints.profile, {
    next: { tags: ["profile"] },
    headers: { Cookie: `sessionid=${sessionId}` },
  });

  // @NOTE: maybe if the error thrown it would be better to use safeParse?
  ProfileSchema.parse(rawData);

  return getParsedProfile(rawData);
};

export const updateProfile = async () => {
  const sessionId = cookies().get("sessionid")?.value;
  const rawData = await request<RawProfile>(endpoints.profile, {
    headers: { Cookie: `sessionid=${sessionId}` },
    method: "PUT",
  });

  ProfileSchema.parse(rawData);

  return getParsedProfile(rawData);
};
