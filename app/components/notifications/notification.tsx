import dayjs from "dayjs";
import { Link } from "react-router";

import {
  getColor,
  type Notification as NotificationType,
} from "~/lib/notifications";
import { cn } from "~/lib/utils";

import Icon from "~/components/utils/icons";
import { Button, buttonVariants } from "~/components/ui/button";

export const Notification = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  const { date, link, type, title, attached, description } = notification;

  return (
    <li className="p-4 flex items-start gap-4 border-b">
      <span
        style={{ color: getColor(type) }}
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "outline",
          }),
          "shadow-sm"
        )}
      >
        <Icon name={type} className="size-5" />
      </span>
      <div className="flex flex-col gap-2 ">
        <h3 className="text-base lg:text-sm font-light lg:font-normal text-foreground/80">{title}</h3>
        <p className="text-xs text-foreground/50">{description}</p>
        <div className="flex flex-wrap gap-4">
          {Boolean(attached) && (
            <Button asChild size={"icon"} variant={"outline"}>
              <Link to={attached || ""}>
                <Icon
                  name={"cloudDownload"}
                  className="size-5 text-[#6600CC]"
                />
              </Link>
            </Button>
          )}
          {Boolean(link) && (
            <Button
              asChild
              size={"sm"}
              variant={"outline"}
              className="h-auto p-1 whitespace-break-spaces w-fit max-w-full justify-start text-start rounded-sm px-2 border-dashed"
            >
              <Link to={link?.to || ""} className="">
                <span className="flex items-center gap-1">
                  <Icon
                    name="link"
                    className="inline -rotate-45 text-[#0066CC]"
                  />
                  {link?.label}
                </span>
              </Link>
            </Button>
          )}
        </div>
        <span className="text-[10px] text-foreground">{dayjs(date).format("D MMM YYYY")}</span>
      </div>
    </li>
  );
};
