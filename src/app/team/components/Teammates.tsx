"use client";

import { ChangeEvent, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image, Skeleton, useDisclosure } from "@nextui-org/react";

import Search from "@/app/team/components/Search";
import { TeammateList } from "@/types/teammates";
import { Profile } from "@/types/profile";
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import TeammateModal from "@/app/team/components/TeammateModal";

type Props = {
  list: TeammateList;
  profile: Profile | null;
};

export default function Teammates({ list, profile }: Props) {
  const [teammateList, setTeammateList] = useState(list);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // @FIX: filtration should be on the backend side
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
      <ControlPanel>
        <h3>{profile?.team}</h3>
        <Button color="primary" onClick={onOpen}>
          + Add teammate
        </Button>
      </ControlPanel>
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
      <TeammateModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
