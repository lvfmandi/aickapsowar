import { toast } from "sonner";
import { NavLink, useLocation, useNavigate } from "react-router";

import { logout } from "~/api/auth/logout";

import { cn } from "~/lib/utils";
import { navItems } from "~/lib/nav-links";
import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";
import { IconText } from "~/components/utils/icon-text";

export const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const Wrapper = mobile ? SheetClose : "div";
  const wrapperProps = Wrapper === "div" ? {} : { asChild: true };

  const handleLogout = async () => {
    const { data, error } = await logout();

    if (error) toast.error(error);

    if (data) {
      toast.success(data);
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <ul>
        {navItems.map(({ to, icon, label }) => (
          <Wrapper key={label} {...wrapperProps}>
            <NavLink to={`/dashboard${to}`}>
              {() => (
                <IconText
                  icon={icon}
                  text={label}
                  active={location.pathname == `/dashboard${to}`}
                  className={cn(
                    "transition-colors duration-200 text-foreground hover:bg-primary/70 hover:text-primary-foreground",
                    location.pathname == `/dashboard${to}` &&
                      "bg-primary/70 hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                />
              )}
            </NavLink>
          </Wrapper>
        ))}
      </ul>
      <Button
        onClick={handleLogout}
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
