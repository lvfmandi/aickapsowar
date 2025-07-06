import type { ReactNode } from "react";

import { Copy } from "~/components/utils/copy";
import { Logo } from "~/components/utils/logo";

/* 
  Renders a form, Copy & Logo components
  Dependencies: title: string & a child: preferrably a form
*/

export const AuthFormWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-between h-full max-h-[80vh] lg:max-h-[600px] lg:max-w-[420px] justify-self-center">
      <Logo text={{}} image={{ className: "size-14" }} />
      <div className="grid gap-4">
        <h1 className="text-3xl font-light">{title}</h1>
        {children}
      </div>
      <Copy />
    </div>
  );
};
