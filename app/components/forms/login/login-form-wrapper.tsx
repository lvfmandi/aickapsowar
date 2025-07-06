import { LoginForm } from "~/components/forms/login/login-form";
import { AuthFormWrapper } from "~/components/auth/auth-form-wrapper";

/* 
  No dependencies.
  Renders the AuthFormWrapper & passes the title: string & LoginForm: component
*/

export const LoginFormWrapper = () => {
  return (
    <AuthFormWrapper title={"Login"}>
      <LoginForm />
    </AuthFormWrapper>
  );
};
