import { AuthFormWrapper } from "~/components/auth/auth-form-wrapper";
import { ResetPasswordForm } from "~/components/forms/reset-password/reset-password-form";

/* 
  No dependencies.
  Renders the AuthFormWrapper & passes the title: string & LoginForm: component
*/

export const ResetPasswordFormWrapper = () => {
  return (
    <AuthFormWrapper
      title={"Reset your password"}
      description="We sent a token to your email, use it here together with your new password"
    >
      <ResetPasswordForm />
    </AuthFormWrapper>
  );
};
