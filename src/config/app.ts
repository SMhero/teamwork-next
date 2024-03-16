export const routes = {
  team: "/team",
  main: "/",
  about: "/about",
  login: "/login",
} as const;

export const endpoints = {
  login: "/v2/login/",
  profile: "/v2/myteam/profile/",
} as const;
