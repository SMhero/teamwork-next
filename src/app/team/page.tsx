import Teammates from "@/app/team/components/Teammates";
import { getTeammatesList } from "@/actions/team/teammates";
import { getProfile } from "@/actions/profile/get";

export default async function Team() {
  const profile = await getProfile();
  const teammates = await getTeammatesList();

  return (
    <section className="max-w-[1280px]">
      <Teammates list={teammates} profile={profile} />
    </section>
  );
}
