"use client";

import { useZustandStore } from "@/components/Provider/ZustandProvider";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";

export default function TeamList() {
  const { teamlist } = useZustandStore(state => state);

  return (
    <div className="w-full">
      <h3 className="text-center m-6">{teamlist?.[0].teamName}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamlist?.map(member => (
          <Card key={member.id} shadow="sm" isPressable disableRipple>
            <CardBody className="overflow-visible p-0">
              {member.photo ? (
                <Image className="m-full" src={member.photo} alt={member.name} shadow="sm" radius="lg" width="100%" />
              ) : (
                <Skeleton className="bg-gradient-to-r from-gray to-gray-300 w-full h-48" isLoaded>
                  <div className="h-52 bg-slate-400"></div>
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
    </div>
  );
}
