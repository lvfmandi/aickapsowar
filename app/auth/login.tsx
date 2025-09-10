import { toast } from "sonner";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

import { login } from "~/api/auth/login";
import { useStore } from "~/lib/store/index.store";
import { LoginFormWrapper } from "~/components/forms/login/login-form-wrapper";

/* 
  This is the page's action that is called once an action takes place e.g submitting a form in the page
*/
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  // Extracting the data from the form
  const password = String(formData.get("password"));
  const studentNo = String(formData.get("studentNo"));

  const { data, error } = await login({ studentNo, password });

  // we failed to log in
  if (error) return { success: false, message: error };

  // we were successful
  if (data)
    return { success: true, data, message: "You logged in successfully" };
}

/* 
  Page component
  Renders the AuthWrapper that takes (FormWrapper OR form):children & imgSrc:str
*/

export default function Login({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (!actionData) return;

    toast[actionData.success ? "success" : "error"](actionData.message);

    if (actionData.success) {
      setUser(actionData.data ?? null);
      navigate("/dashboard");
    }
  }, [actionData, setUser, navigate]);

  return <LoginFormWrapper />;
}
