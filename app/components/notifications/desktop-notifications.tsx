import { IconText } from "~/components/utils/icon-text";
import { Notifications } from "~/components/notifications/notifications";

export const DesktopNotifications = () => {
  return (
    <div className="hidden lg:block border-l h-full overflow-y-auto">
      <IconText
        icon={"notification"}
        text={"Notifications"}
        className="flex sticky top-0 bg-background/50 backdrop-blur-md z-2"
      />
      <div className="overflow-y-auto">
        <Notifications />
      </div>
    </div>
  );
};
