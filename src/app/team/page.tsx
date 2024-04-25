import Search from "@/app/team/components/Search";
import TeamList from "@/modules/TeamList/TeamList";
import { getTeammateList } from "@/actions/teammates";

export default async function Team() {
  const teammateList = await getTeammateList();

  return (
    <section className="max-w-[1280px]">
      <Search />
      TEAM
      {JSON.stringify(teammateList, null, 2)}
    </section>
  );
}
