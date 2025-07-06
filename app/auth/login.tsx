import { redirect } from "react-router";
import type { Route } from "./+types/login";

import PeopleSmiling from "~/assets/people-smiling-thumbs-up.jpg";

import { AuthWrapper } from "~/components/auth/auth-wrapper";
import { LoginFormWrapper } from "~/components/forms/login/login-form-wrapper";

/* 
  This is the page's action that is called once an action takes place e.g submitting a form in the page
*/

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  // Extracting the data from the form
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  console.log({ username, password });

  // TODO: handle login

  return redirect("/dashboard");
}

/* 
  Page component
  Renders the AuthWrapper that takes (FormWrapper OR form):children & imgSrc:str
*/

export default function Login(_: Route.ComponentProps) {
  return (
    <AuthWrapper src={PeopleSmiling}>
      <LoginFormWrapper />
    </AuthWrapper>
  );
}
