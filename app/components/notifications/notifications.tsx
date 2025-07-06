import { notifications } from "~/lib/notifications";
import { Notification } from "~/components/notifications/notification";

export const Notifications = () => {
  return (
    <ul>
      {notifications.map((notification, key) => (
        <Notification key={key} notification={notification} />
      ))}
    </ul>
  );
};
