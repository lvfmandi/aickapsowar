import { IconText } from "~/components/utils/icon-text";
import { Notifications } from "~/components/notifications/notifications";

export const DesktopNotifications = () => {
  return (
    <div className="hidden lg:flex flex-col border-l h-full overflow-y-hidden">
      <IconText icon={"notification"} text={"Notifications"} />
      <div className="overflow-y-auto">
        <Notifications />
      </div>
    </div>
  );
};
