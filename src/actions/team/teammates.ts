import { cookies } from "next/headers";

import { getParsedTeammatesList, RawTeammatesList, TeammatesListSchema } from "@/actions/team/parser";
import { endpoints } from "@/config/app";
import { request } from "@/services/request";

export const getTeammatesList = async () => {
  const sessionId = cookies().get("sessionid")?.value;

  const rawData = await request<RawTeammatesList>(endpoints.teammatesList, {
    headers: { Cookie: `sessionid=${sessionId}` },
  });

  TeammatesListSchema.parse(rawData);

  return getParsedTeammatesList(rawData);
};
