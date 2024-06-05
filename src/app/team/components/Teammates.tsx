"use client";

import { ChangeEvent, useState } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";

import Search from "@/app/team/components/Search";
import { TeammateList } from "@/types/teammates";
import { Profile } from "@/types/profile";

type Props = {
  list: TeammateList;
  profile: Profile | null;
};

export default function Teammates({ list, profile }: Props) {
  const [teammateList, setTeammateList] = useState<TeammateList>(list);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTeammateList(() => {
      if (value) {
        return teammateList.filter(member => member.name.includes(value) || member.position.includes(value));
      }

      return list;
    });
  };

  const onClear = () => {
    setTeammateList(list);
  };

  return (
    <div className="w-full">
      <Search onChange={onChange} onClear={onClear} />
      <h3 className="text-center m-6">{profile?.team}</h3>
      {!!teammateList.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teammateList.map(member => (
            <Card key={member.id} shadow="sm" isPressable disableRipple>
              <CardBody className="overflow-visible p-0">
                {member.photo ? (
                  <Image className="m-full" src={member.photo} alt={member.name} shadow="sm" radius="lg" width="100%" />
                ) : (
                  <Skeleton className="bg-gradient-to-r from-gray to-gray-300 w-full h-48" isLoaded>
                    <div className="h-52 bg-slate-400" />
                  </Skeleton>
                )}
              </CardBody>
              <CardFooter className="text-small justify-between">
                {member.position ? (
                  <div className="w-full">
                    <p className="text-center ">{member.name}</p>
                    <span className="text-center italic text-xs">{member.position}</span>
                  </div>
                ) : (
                  <Skeleton className="bg-gradient-to-r from-gray to-gray-300 w-full h-4" isLoaded>
                    <div className="h-52 bg-slate-400"></div>
                  </Skeleton>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-xl text-center">No members found...</div>
      )}
    </div>
  );
}
