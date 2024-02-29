import { endpoints } from "@/config/app";
import { request } from "http";

export async function getProfile() {
  return request(endpoints.profile, { method: "GET" });
}
