import { toast } from "sonner";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

import { forgotPassword } from "~/api/auth/forgot-password";

import { useStore } from "~/lib/store/index.store";
import { ForgotPasswordFormWrapper } from "~/components/forms/forgot-password/forgot-password-wrapper";

/* 
  This is the page's action that is called once an action takes place e.g submitting a form in the page
*/
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  // Extracting the data from the form
  const studentNo = String(formData.get("studentNo"));

  const { data, error } = await forgotPassword({ studentNo });

  // we failed to log in
  if (error) return { success: false, message: error };
  // we were successful
  if (data) return { success: true, message: data };
}

/* 
  Page component
  Renders the AuthWrapper that takes (FormWrapper OR form):children & imgSrc:str
*/

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (!actionData) return;

    toast[actionData.success ? "success" : "error"](actionData.message);

    if (actionData.success) navigate("/auth/reset-password");
  }, [actionData, setUser, navigate]);

  return <ForgotPasswordFormWrapper />;
}
