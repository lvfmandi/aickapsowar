import type { Icons } from "~/components/utils/icons";

export type NavItem = { to: string; icon: keyof typeof Icons; label: string };

export const navItems: NavItem[] = [
  {
    to: "",
    icon: "home",
    label: "Dashboard",
  },
  {
    to: "/finances",
    icon: "wallet",
    label: "Finances",
  },
  {
    to: "/units",
    icon: "layers",
    label: "Units",
  },
  {
    to: "/lecture-cards",
    icon: "idCard",
    label: "Lecture Cards",
  },
  // {
  //   to: "/timetable",
  //   icon: "calendar",
  //   label: "Timetable",
  // },
  // {
  //   to: "/grades",
  //   icon: "receipt",
  //   label: "Grades",
  // },
  {
    to: "/hostel-booking",
    icon: "bed",
    label: "Hostel Booking",
  },
  // {
  //   to: "/academic-requisition",
  //   icon: "send",
  //   label: "Academic Requisition",
  // },
  // {
  //   to: "/graduation",
  //   icon: "school",
  //   label: "Graduation",
  // },
  // {
  //   to: "/suggestion-box",
  //   icon: "chatbox",
  //   label: "Suggestion Box",
  // },
  // {
  //   to: "/account-management",
  //   icon: "personCircle",
  //   label: "Account Management",
  // },
];
