import { cookies } from "next/headers";

import { getParsedProfile, ProfileSchema, RawProfile } from "@/actions/profile/parser";
import { endpoints } from "@/config/app";
import { request } from "@/services/request";

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
