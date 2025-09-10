import { Form } from "react-router";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

/* 
  No dependencies
  Renders the forgot password form
*/

export const ForgotPasswordForm = () => {
  return (
    <Form method="post" className="grid gap-4">
      <Input name="studentNo" type="text" placeholder="Student Number" />
      <Button type="submit">Send an email</Button>
    </Form>
  );
};
