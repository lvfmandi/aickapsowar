import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/utils/user-avatar";
import { MobileNotifications } from "../notifications/mobile-notifications";

export const FastActions = () => {
  return (
    <div className="flex gap-4 h-fit items-center justify-between container py-4 lg:px-4 bg-accent/50 lg:bg-background lg:border-b">
      <div className="flex items-center gap-4 w-full">
        {/* TODO: Change the name */}
        <h1 className="font-light text-xl">Hello, Charles</h1>
        {/* TODO: Add functionality of searching */}
        <Input
          type="search"
          placeholder="Search the dashboard"
          className="hidden lg:inline-block max-w-sm"
        />
      </div>
      <div className="flex gap-4 items-center">
        <MobileNotifications />
        {/* TODO: Add functionality of avatar */}
        <UserAvatar
          src={""}
          initials={"CN"}
          className="hidden lg:inline-block"
        />
      </div>
    </div>
  );
};
