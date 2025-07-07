/* 
    types of notifications
    1. Information - info
    2. Success - success
    3. Error - error
    4. Warning - warning
    5. Date - date
    6. Reminder - reminder
    7. Attached - attached
  */

export type NotitificationTypes =
  | "date"
  | "info"
  | "success"
  | "warning"
  | "reminder"
  | "attached";

export type Notification = {
  date: string;
  title: string;
  attached?: string;
  description: string;
  type: NotitificationTypes;
  link?: { to: string; label: string };
};

export const notifications: Notification[] = [
  {
    type: "warning",
    title: "Registration of Units",
    description:
      "All students are advised to register their units before the deadline expires on the 25th of August 2025.",
    date: "2025-08-01",
  },
  {
    type: "info",
    title: "Library Extended Hours",
    description:
      "The university library will remain open until 10 PM from Monday to Friday during exam week.",
    link: { label: "Latest books", to: "" },
    date: "2025-07-20",
  },
  {
    type: "success",
    title: "Payment Received",
    description:
      "Your tuition fee payment for the semester has been successfully processed.",
    date: "2025-07-15",
  },
  {
    type: "warning",
    title: "Exam Card Not Generated",
    description:
      "You must clear your fees before you can generate your exam card.",
    date: "2025-07-10",
  },
  {
    type: "date",
    title: "Project Proposal Submission",
    description:
      "Final year students must submit their project proposals by 15th September 2025.",
    date: "2025-09-15",
  },
  {
    type: "reminder",
    title: "Upcoming Class Presentation",
    description:
      "You have a group presentation for Business Strategy on Thursday at 8:00 AM in Room B204.",
    date: "2025-07-08T08:00:00",
  },
  {
    type: "attached",
    title: "Download Your Admission Letter",
    description:
      "Your official admission letter has been uploaded. Please download and review it.",
    link: { label: "Check", to: "" },
    attached: "/documents/admission-letter.pdf",
    date: "2025-06-30",
  },
];

export const getColor = (type: NotitificationTypes): string => {
  switch (type) {
    case "info":
      return "#3B82F6"; // Blue-500
    case "success":
      return "#10B981"; // Green-500
    case "warning":
      return "#F59E0B"; // Amber-500
    case "reminder":
      return "#EC4899"; // Pink-500
    case "attached":
      return "#8B5CF6"; // Violet-500
    case "date":
      return "#22C55E"; // Lime/Green-500
    default:
      return "#9CA3AF"; // Gray-400 (default)
  }
};
