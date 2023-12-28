import { endpoints } from "@/config/app";
import { get } from "@/services/request";

export async function getProfile() {
  const data = get(endpoints.profile)
    .then(response => console.warn(response.data))
    .catch(error => console.error(error));

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
