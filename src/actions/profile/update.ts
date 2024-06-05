import { getParsedProfile, ProfileSchema, RawProfile } from "@/actions/profile/parser";
import { endpoints } from "@/config/app";
import { request } from "@/services/request";
import { Profile } from "@/types/profile";

export const updateProfile = async (
  profile: Profile,
  data: { defaultMeetingDuration: number; firstName: string; lastName: string; team: string; timezone: string }
): Promise<Profile> => {
  const rawData = await request<RawProfile>(endpoints.profile, {
    method: "PUT",
    body: JSON.stringify({
      user: {
        email: profile.email,
        first_name: data.firstName,
        last_name: data.lastName,
      },
      teamlead: {
        timezone: data.timezone,
        photo: profile?.photoUrl,
        default_meeting_duration: data.defaultMeetingDuration,
      },
      team: {
        name: data.team,
      },
    }),
  });

  ProfileSchema.parse(rawData);

  return getParsedProfile(rawData);
};
