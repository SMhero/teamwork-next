import { endpoints } from "@/config/app";
import { request } from "@/services/request";

export async function getProfile() {
  const data = await request(endpoints.profile);

  return {
    props: {
      data,
    },
  };
}

export default function Team() {
  const profile = getProfile();
  console.log("Profile:", profile);
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">Team</main>;
}
