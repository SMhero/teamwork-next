import { useZustandStore } from "@/components/Provider/ZustandProvider";
import { Image } from "@nextui-org/react";

export default function TeamList() {
  const { teamlist } = useZustandStore(state => state);
  return (
    <div className="w-full">
      <h3 className="text-center">{teamlist?.[0].teamName}</h3>
      <div className="flex justify-around flex-wrap">
        {teamlist?.map(member => (
          <div className="flex flex-col items-center flex-grow" key={member.id}>
            <Image className="m-full" src={member.photo} alt={member.name} />
            <span>{member.position}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
