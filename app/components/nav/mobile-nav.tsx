import Icon from "~/components/utils/icons";
import { Logo } from "~/components/utils/logo";
import { Button } from "~/components/ui/button";
import { UserAvatar } from "~/components/utils/user-avatar";
import { MobileNavMenu } from "~/components/nav/mobile-nav-menu";

export const MobileNav = () => {
  return (
    <div className="ticky inset-0 bottom-auto bg-background/50 z-50 backdrop-blur-md container flex items-center py-4 gap-4 justify-between lg:px-0 lg:hidden border-b">
      <Logo
        image={{ className: "size-8" }}
        text={{ className: "text-[9px]" }}
      />
      <div className="flex items-center gap-3">
        <Button variant={"outline"} size={"icon"} className="size-10">
          {/* TODO: Add functionality of searching */}
          <Icon name="search" className="size-[21px]" />
        </Button>
        {/* TODO: Add functionality of avatar */}
        <UserAvatar src={""} initials={"CN"} />
        <MobileNavMenu />
      </div>
    </div>
  );
};
