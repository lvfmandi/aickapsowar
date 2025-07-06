import { cn } from "~/lib/utils";

import LogoImage from "~/assets/tsmhs.png";

export const Logo = ({
  text,
  image,
  className,
  alt = "Thika School for Medical and health sciences logo",
}: {
  alt?: string;
  className?: string;
  image?: { className?: string };
  text?: boolean | { className?: string };
}) => {
  const textIsObject = typeof text === "object";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src={LogoImage} alt={alt} className={cn(image?.className)} />
      {Boolean(text) && (
        <span
          className={cn(
            "font-semibold text-primary max-w-3xs",
            textIsObject && text?.className
          )}
        >
          THIKA SCHOOL OF MEDICAL AND HEALTH SCIENCES
        </span>
      )}
    </div>
  );
};
