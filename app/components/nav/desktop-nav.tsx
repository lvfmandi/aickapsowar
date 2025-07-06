import { Logo } from "~/components/utils/logo";
import { NavLinks } from "~/components/nav/nav-links";

export const DesktopNav = () => {
  return (
    <div className="hidden lg:flex flex-col max-w-2xs min-w-fit border-r">
      <Logo
        image={{ className: "size-8" }}
        className="p-4 border-b self-start"
        text={{ className: "text-sm text-foreground/90" }}
      />
      <NavLinks />
    </div>
  );
};
