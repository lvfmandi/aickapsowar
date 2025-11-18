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

export const notifications: Notification[] = [];

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
