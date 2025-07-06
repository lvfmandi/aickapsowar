import { cn } from "~/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import Icon from "~/components/utils/icons";
import { Logo } from "~/components/utils/logo";
import { NavLinks } from "~/components/nav/nav-links";
import { buttonVariants } from "~/components/ui/button";

export const MobileNavMenu = () => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ size: "icon", variant: "outline" }),
          "size-10"
        )}
      >
        <Icon name="menu" className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader className="py-5 border-b">
          <SheetTitle>
            <Logo
              image={{ className: "size-8" }}
              text={{ className: "text-[9px]" }}
            />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="h-full">
          <NavLinks mobile />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
