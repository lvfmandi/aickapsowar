import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/utils/user-avatar";
import { MobileNotifications } from "~/components/notifications/mobile-notifications";
import { useStore } from "~/lib/store/index.store";
import { ThemeToggle } from "./theme-toggle";

export const FastActions = () => {
  const user = useStore((state) => state.user);
  const userName = user?.name;
  const [firstName, lastName] = userName?.split(" ") || [];

  return (
    <div className="flex gap-4 h-fit items-center justify-between container py-4 lg:px-4 bg-background border-b">
      <div className="flex items-center gap-4 w-full">
        {/* TODO: Change the name */}
        <h1 className="font-light text-xl">Hello, {user ? firstName : "..."}</h1>
        {/* TODO: Add functionality of searching */}
        <Input
          type="search"
          placeholder="Search the dashboard"
          className="hidden lg:inline-block max-w-sm"
        />
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <MobileNotifications />
        {/* TODO: Add functionality of avatar */}
        <UserAvatar
          src={""}
          initials={user ? firstName.charAt(0) + lastName.charAt(0) : "..."}
          className="hidden lg:inline-block"
        />
      </div>
    </div>
  );
};
