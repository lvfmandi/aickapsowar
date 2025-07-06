import { NavLink } from "react-router";

import { cn } from "~/lib/utils";
import { navItems } from "~/lib/nav-links";

import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";

export const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const Wrapper = mobile ? SheetClose : "div";

  return (
    <div className="flex flex-col justify-between h-full">
      <ul>
        {navItems.map(({ to, icon, label }) => (
          <Wrapper key={label} asChild>
            <NavLink to={`/dashboard${to}`}>
              {({ isActive }) => (
                <div
                  className={cn(
                    "flex p-4 gap-4 border-b",
                    mobile ? "p-4" : "px-4 py-2",
                    isActive
                      ? "text-primary border-l-6 border-l-primary/70"
                      : "text-foreground/70"
                  )}
                >
                  {<Icon name={icon} size={mobile ? 24 : 20} />}
                  <span className={cn(mobile ? "text-base" : "text-sm", "font-light lg:font-normal")}>
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          </Wrapper>
        ))}
      </ul>
      <Button
        variant={"ghost"}
        className={cn(
          mobile ? "h-15" : "h-12",
          "justify-start border-t gap-4 px-4  font-normal text-red-500"
        )}
      >
        {<Icon name={"logOut"} size={24} className="size-[21px] =" />}
        <span className="text-base font-light lg:font-normal">Log Out</span>
      </Button>
    </div>
  );
};
