import { Logo } from "~/components/utils/logo";
import { NavLinks } from "~/components/nav/nav-links";

export const DesktopNav = () => {
  return (
    <div className="dark hidden lg:flex flex-col max-w-2xs min-w-fit border-r bg-background">
      <Logo
        image={{ className: "size-8" }}
        className="p-4 border-b self-start"
        text={{ className: "text-sm text-foreground/80" }}
      />
      <NavLinks />
    </div>
  );
};
