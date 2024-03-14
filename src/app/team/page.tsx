import { endpoints } from "@/config/app";
import { request } from "@/services/request";
import { Profile } from "@/store/useProfileStore";
import { cookies } from "next/headers";

async function getProfile() {
  const sessionId = cookies().get("sessionid")?.value;
  const data = await request<Profile>(endpoints.profile, { headers: { Cookie: `sessionid=${sessionId}` } });

  return data;
}

export default async function Team() {
  const profile = await getProfile();

  // console.log("PROFILE", store.profile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Team: {JSON.stringify(profile)}
    </main>
  );
}
