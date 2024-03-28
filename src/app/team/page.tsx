"use client";

import { useEffect } from "react";
import { useZustandStore } from "@/components/Provider/ZustandProvider";
import mockedUser from "@/mock/user.json";
import mockedTeammates from "@/mock/teammates.json";
import Search from "@/app/team/components/Search";
import TeamList from "@/modules/TeamList/TeamList";

// @FIX: mocking in progress
// import { endpoints } from "@/config/app";
// import { request } from "@/services/request";
// import { Profile } from "@/store/profile";
// import { cookies } from "next/headers";

// async function getProfile() {
//   const sessionId = cookies().get("sessionid")?.value;
//   const data = await request<Profile>(endpoints.profile, { headers: { Cookie: `sessionid=${sessionId}` } });

//   return data;
// }

export default function Team() {
  const { profile, setProfile, setTeam } = useZustandStore(state => state);

  // const profile = await getProfile().then(response => {
  //   setProfile(response);
  //   return response;
  // });

  useEffect(() => {
    setProfile(JSON.parse(JSON.stringify(mockedUser)));
    setTeam(JSON.parse(JSON.stringify(mockedTeammates)));
  }, []);

  return (
    <>
      <Search />
      <TeamList />
    </>
  );
}
