import { Outlet, redirect } from "react-router";

import { fetchMe } from "~/api/auth/fetchMe";

import KapsowarImage from "~/assets/kapsowar-image.jpg";

import { useStore } from "~/lib/store/index.store";
import { AuthWrapper } from "~/components/auth/auth-wrapper";

export async function clientLoader() {
  const { setUser } = useStore.getState();

  let isLoggedIn = false;
  const { data } = await fetchMe();

  if (data) {
    isLoggedIn = true;
    setUser(data);
  }
  if (isLoggedIn) return redirect("/dashboard");
}

export default function AuthLayout() {
  return (
    <AuthWrapper src={KapsowarImage}>
      <Outlet />
    </AuthWrapper>
  );
}
