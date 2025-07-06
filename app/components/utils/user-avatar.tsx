import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const UserAvatar = ({
  src,
  initials,
  className,
}: {
  src: string;
  initials: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarImage src={src} className="size-8" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
