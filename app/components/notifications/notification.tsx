import dayjs from "dayjs";
import { Link } from "react-router";

import {
  getColor,
  type Notification as NotificationType,
} from "~/lib/notifications";
import { cn } from "~/lib/utils";

import Icon from "~/components/utils/icons";
import { Button, buttonVariants } from "~/components/ui/button";
import { Badge } from "../ui/badge";

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
        <h3 className="text-base lg:text-sm font-light lg:font-normal text-foreground/80">
          {title}
        </h3>
        <p className="text-xs text-foreground/50">{description}</p>
        <div className="flex items-center flex-wrap gap-4">
          {Boolean(attached) && (
            <Badge asChild variant={"outline"} className="w-9 h-9 rounded-full group">
              <Link to={attached || ""}>
                <Icon
                  name={"cloudDownload"}
                  className="!size-4 text-purple-500 group-hover:text-primary"
                />
              </Link>
            </Badge>
          )}
          {Boolean(link) && (
            <Badge asChild variant={"outline"}>
              <Link to={link?.to || ""} className="group !font-light !text-sm">
                <span className="flex items-center gap-1">
                  <Icon
                    name="link"
                    className="inline -rotate-45 text-blue-500 group-hover:text-primary"
                  />
                  {link?.label}
                </span>
              </Link>
            </Badge>
          )}
        </div>
        <span className="text-[10px] text-foreground">
          {dayjs(date).format("D MMM YYYY")}
        </span>
      </div>
    </li>
  );
};
