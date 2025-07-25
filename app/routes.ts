import {
  route,
  index,
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
    route("units", "./dashboard/units.tsx"),
    route("grades", "./dashboard/grades.tsx"),
    route("finances", "./dashboard/finances.tsx"),
    route("timetable", "./dashboard/timetable.tsx"),
    route("graduation", "./dashboard/graduation.tsx"),
    route("lecture-cards", "./dashboard/lecture-cards.tsx"),
    route("hostel-booking", "./dashboard/hostel-booking.tsx"),
    route("academic-requisition", "./dashboard/academic-requisition.tsx"),
  ]),
] satisfies RouteConfig;
