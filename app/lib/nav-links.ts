import type { Icons } from "~/components/utils/icons";

export type NavItem = { to: string; icon: keyof typeof Icons; label: string };

export const navItems: NavItem[] = [
  {
    to: "",
    icon: "home",
    label: "Dashboard",
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
  {
    to: "/grades",
    icon: "document",
    label: "Grades",
  },
  {
    to: "/hostel-booking",
    icon: "bed",
    label: "Hostel Booking",
  },
  {
    to: "/academic-requision",
    icon: "send",
    label: "Academic Requisition",
  },
  {
    to: "/graduation",
    icon: "school",
    label: "Graduation",
  },
  {
    to: "/account-management",
    icon: "personCircle",
    label: "Account Management",
  },
];
