import { Outlet } from "react-router";

import { DashboardNav } from "~/components/nav/dashboard-nav";
import { FastActions } from "~/components/utils/fast-actions";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen max-h-screen lg:grid lg:grid-cols-[288px_auto]">
      <DashboardNav />
      <div className="flex flex-col h-screen max-h-screen">
        <FastActions />
        <Outlet />
      </div>
    </div>
  );
}
