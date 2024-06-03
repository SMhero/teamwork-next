import { endpoints } from "@/config/app";
import { request } from "@/services/request";
import { TeammateList } from "@/types/teammates";

import { cookies } from "next/headers";
import { z } from "zod";

const TeammateSchema = z.array(
  z.object({
    id: z.number().int(),
    name: z.string(),
    photo: z.string(),
    position: z.string(),
    team_id: z.number().int(),
    team_name: z.string(),
  })
);

type RawTeammateList = z.infer<typeof TeammateSchema>;

const getParsedTeammateList = (data: RawTeammateList): TeammateList =>
  data.map(mate => ({
    id: mate.id,
    name: mate.name,
    photo: `http://localhost:8000/${mate.photo}`,
    position: mate.position,
    teamId: mate.team_id,
    teamName: mate.team_name,
  }));

export const getTeammateList = async () => {
  const sessionId = cookies().get("sessionid")?.value;

  const rawData = await request<RawTeammateList>(endpoints.teammateList, {
    headers: { Cookie: `sessionid=${sessionId}` },
  });

  TeammateSchema.parse(rawData);

  return getParsedTeammateList(rawData);
};
