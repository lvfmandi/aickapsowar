import { AuthFormWrapper } from "~/components/auth/auth-form-wrapper";
import { ForgotPasswordForm } from "~/components/forms/forgot-password/forgot-password-form";

/* 
  No dependencies.
  Renders the AuthFormWrapper & passes the title: string & LoginForm: component
*/

export const ForgotPasswordFormWrapper = () => {
  return (
    <AuthFormWrapper
      title={"Forgot your password?"}
      description="Don't worry, it happens to the best of us. Just input your student number and we'll send a reset token to the email registered"
    >
      <ForgotPasswordForm />
    </AuthFormWrapper>
  );
};
