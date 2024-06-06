export const routes = {
  about: "/about",
  login: "/login",
  main: "/",
  meetings: "/meetings",
  settings: "/settings",
  team: "/team",
  teammate: "/team/teammate",
};

export const endpoints = {
  login: "/v2/login/",
  logout: "/v2/logout/",
  profile: "/v2/myteam/profile/",
  teammate: "/v2/myteam/teammate/{{id}}/",
  teammatesList: "/v2/myteam/teammate/list/",
};
