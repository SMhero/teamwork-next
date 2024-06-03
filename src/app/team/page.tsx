import Teammates from "@/app/team/components/Teammates";
import { getTeammateList } from "@/actions/teammates";

export default async function Team() {
  const teammateList = await getTeammateList();

  return (
    <section className="max-w-[1280px]">
      <Teammates list={teammateList} />
    </section>
  );
}
