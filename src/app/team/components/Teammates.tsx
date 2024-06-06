"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardFooter, Image, Skeleton, useDisclosure } from "@nextui-org/react";

import Search from "@/app/team/components/Search";
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import TeammateModal from "@/app/team/components/TeammateModal";
import { TeammatesList } from "@/types/teammates";
import { Profile } from "@/types/profile";
import { routes } from "@/config/app";

type Props = {
  list: TeammatesList;
  profile: Profile | null;
};

export default function Teammates({ list, profile }: Props) {
  const [teammatesList, setTeammatesList] = useState(list);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // @FIX: filtration should be on the backend side
    setTeammatesList(() => {
      if (value) {
        return teammatesList.filter(member => member.name.includes(value) || member.position.includes(value));
      }

      return list;
    });
  };

  const onClear = () => {
    setTeammatesList(list);
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
      {!!teammatesList.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teammatesList.map(member => (
            <Link key={member.id} href={`${routes.teammate}/${member.id}`}>
              <Card shadow="sm" isPressable disableRipple>
                <CardBody className="overflow-visible p-0">
                  <Image
                    className="m-full h-48"
                    // @FIX: change when photos will be not corrupted
                    // src={member.photo}
                    src="./dunder_mifflin.svg"
                    alt={member.name}
                    shadow="sm"
                    radius="lg"
                    width="100%"
                  />
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
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-xl text-center">No members found...</div>
      )}
      <TeammateModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
