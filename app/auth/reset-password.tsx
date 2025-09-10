import { toast } from "sonner";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

import { resetPassword } from "~/api/auth/reset-password";

import { useStore } from "~/lib/store/index.store";
import { ResetPasswordFormWrapper } from "~/components/forms/reset-password/reset-password-wrapper";

/* 
  This is the page's action that is called once an action takes place e.g submitting a form in the page
*/
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  // Extracting the data from the form
  const token = String(formData.get("token"));
  const password = String(formData.get("password"));
  const studentNo = String(formData.get("studentNo"));
  const confirmPassword = String(formData.get("confirmPassword"));

  const { data, error } = await resetPassword({
    token,
    password,
    studentNo,
    confirmPassword,
  });

  // we failed to log in
  if (error) return { success: false, message: error };
  // we were successful
  if (data) return { success: true, message: data };
}

/* 
  Page component
  Renders the AuthWrapper that takes (FormWrapper OR form):children & imgSrc:str
*/

export default function ResetPassword({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (!actionData) return;

    toast[actionData.success ? "success" : "error"](actionData.message);

    if (actionData.success) navigate("/auth/login");
  }, [actionData, setUser, navigate]);

  return <ResetPasswordFormWrapper />;
}
