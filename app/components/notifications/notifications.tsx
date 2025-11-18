import { notifications } from "~/lib/notifications";
import { Notification } from "~/components/notifications/notification";
import Icon from "../utils/icons";

export const Notifications = () => {
  return (
    <ul>
      {notifications.length ? (
        notifications.map((notification, key) => (
          <Notification key={key} notification={notification} />
        ))
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground p-4">
          <Icon
            name={"fileTray"}
            className="w-fit size-5 [&_path]:stroke-[32px]"
          />
          <p className="font-normal text-sm">No notifications</p>
        </div>
      )}
    </ul>
  );
};
