import {
  route,
  index,
  layout,
  prefix,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),

  //   Auth routes
  ...prefix("auth", [route("login", "./auth/login.tsx")]),

  // Dashboard routes
  route("dashboard", "./dashboard/layout.tsx", [
    index("./dashboard/home.tsx"),
  ]),
] satisfies RouteConfig;
