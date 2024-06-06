import { cookies } from "next/headers";

import { getParsedTeammate, RawTeammate, TeammateSchema } from "@/actions/team/parser";
import { endpoints } from "@/config/app";
import { getUrlWithParams, request } from "@/services/request";

export const getTeammate = async (id: string) => {
  const sessionId = cookies().get("sessionid")?.value;

  const rawData = await request<RawTeammate>(endpoints.teammate, {
    headers: { Cookie: `sessionid=${sessionId}` },
    params: {
      id,
    },
  });

  TeammateSchema.parse(rawData);

  return getParsedTeammate(rawData);
};
