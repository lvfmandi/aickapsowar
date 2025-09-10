import { Form, Link } from "react-router";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

/* 
  No dependencies
  Renders the reset password form
*/

export const ResetPasswordForm = () => {
  return (
    <Form method="post" className="grid gap-4">
      <Input name="studentNo" type="text" placeholder="Student Number" />
      <Input name="password" type="text" placeholder="Password" />
      <Input
        type="text"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <Input name="token" type="text" placeholder="123456" />
      <Button type="submit">Send an email</Button>
      <Link to={"/auth/login"}>
        <small className="text-primary">Back to Login</small>
      </Link>
    </Form>
  );
};
