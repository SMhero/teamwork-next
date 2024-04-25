import { endpoints } from "@/config/app";
import { request } from "@/services/request";

export async function login(values: { email: string; password: string }) {
  try {
    await request(endpoints.login, {
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
      method: "POST",
    });
  } catch (error) {
    if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
      throw Error(error.message);
    }
  }
}
