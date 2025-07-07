import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import Icon from "~/components/utils/icons";
import { buttonVariants } from "~/components/ui/button";
import { Notifications } from "~/components/notifications/notifications";

export const MobileNotifications = () => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "size-10 lg:hidden border shadow-xs"
        )}
      >
        <Icon name="notification" className="size-5" />
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader className="py-5 border-b">
          <SheetTitle className="text-2xl font-light">Notifications</SheetTitle>
        </SheetHeader>
        <SheetDescription className="h-full overflow-y-auto">
          <Notifications />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
