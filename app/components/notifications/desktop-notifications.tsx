import { Notifications } from "~/components/notifications/notifications";

export const DesktopNotifications = () => {
  return (
    <div className="hidden lg:flex flex-col border-l overflow-y-hidden">
      <div className="px-4 py-2 border-b">
        <h2 className="text-base font-light text-foreground/80">Notifications</h2>
      </div>
      <div className="overflow-y-auto">
        <Notifications />
      </div>
    </div>
  );
};
