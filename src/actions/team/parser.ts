import { Teammate, TeammatesList } from "@/types/teammates";
import { z } from "zod";

export const TeammateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  photo: z.string(),
  position: z.string(),
  team_id: z.number().int(),
  team_name: z.string(),
});
export const TeammatesListSchema = z.array(TeammateSchema);

export type RawTeammatesList = z.infer<typeof TeammatesListSchema>;
export type RawTeammate = z.infer<typeof TeammateSchema>;

export const getParsedTeammatesList = (data: RawTeammatesList): TeammatesList =>
  data.map(mate => ({
    id: mate.id,
    name: mate.name,
    photo: `http://localhost:8000/${mate.photo}`,
    position: mate.position,
    teamId: mate.team_id,
    teamName: mate.team_name,
  }));

export const getParsedTeammate = (data: RawTeammate): Teammate => ({
  id: data.id,
  name: data.name,
  photo: `http://localhost:8000/${data.photo}`,
  position: data.position,
  teamId: data.team_id,
  teamName: data.team_name,
});
