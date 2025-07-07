import { NavLink, useNavigate } from "react-router";

import { cn } from "~/lib/utils";
import { navItems } from "~/lib/nav-links";

import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";
import { IconText } from "../utils/icon-text";

export const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const navigate = useNavigate();

  const Wrapper = mobile ? SheetClose : "div";

  return (
    <div className="flex flex-col justify-between h-full">
      <ul>
        {navItems.map(({ to, icon, label }) => (
          <Wrapper key={label} asChild>
            <NavLink to={`/dashboard${to}`}>
              {({ isActive }) => (
                <IconText
                  icon={icon}
                  text={label}
                  active={isActive}
                  className={cn(isActive && "border-l-4 border-l-primary/90")}
                />
              )}
            </NavLink>
          </Wrapper>
        ))}
      </ul>
      <Button
        // TODO: Implement logging out
        onClick={() => navigate("/auth/login")}
        className={cn(
          mobile ? "h-15" : "h-12",
          "justify-start border-t gap-4 px-4  font-normal text-red-500"
        )}
        variant={"ghost"}
      >
        {<Icon name={"logOut"} size={24} className="size-[21px] =" />}
        <span className="text-base font-light lg:font-normal">Log Out</span>
      </Button>
    </div>
  );
};
