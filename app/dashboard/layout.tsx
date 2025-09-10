import { Outlet, redirect } from "react-router";

import { fetchMe } from "~/api/auth/fetchMe";

import { FastActions } from "~/components/utils/fast-actions";
import { DashboardNav } from "~/components/nav/dashboard-nav";
import { useStore } from "~/lib/store/index.store";

export async function clientLoader() {
  const { setUser } = useStore.getState();

  let isLoggedIn = false;
  const { data, error } = await fetchMe();

  if (data) {
    isLoggedIn = true;
    setUser(data);
  }
  if (!isLoggedIn) return redirect("/auth/login");
}

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen max-h-screen lg:grid lg:grid-cols-[288px_auto]">
      <DashboardNav />
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <FastActions />
        <Outlet />
      </div>
    </div>
  );
}
