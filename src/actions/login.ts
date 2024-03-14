import { endpoints } from "@/config/app";
import { request } from "@/services/request";

export async function login(values: { email: string; password: string }) {
  await request(endpoints.login, {
    body: JSON.stringify({
      username: values.email,
      password: values.password,
    }),
    method: "POST",
  });
}
