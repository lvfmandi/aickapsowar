import { Link, useFetcher } from "react-router";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

/* 
  No dependencies
  Renders the login form
*/

export const LoginForm = () => {
  let fetcher = useFetcher();
  const { Form } = fetcher;

  return (
    <Form method="post" action="/auth/login" className="grid gap-4">
      <Input name="username" type="text" placeholder="Admission Number" />
      <Input name="password" type="password" placeholder="Password" />
      <Label className="hover:bg-accent/50 flex items-start gap-3 border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-orange-50 dark:has-[[aria-checked=true]]:border-orange-900 dark:has-[[aria-checked=true]]:bg-orange-950">
        <Checkbox
          id="remember"
          name="remember"
          className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-orange-700 dark:data-[state=checked]:bg-orange-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="font-medium text-sm leading-none">Remember Me</p>
          <span className="text-muted-foreground leading-[18px]">
            Your credentials will be remembered for the next time you log in
          </span>
        </div>
      </Label>
      <Button type="submit">Log In</Button>
      <Link to={"/forgot-password"}>
        <small className="text-primary">Forgot Password ?</small>
      </Link>
    </Form>
  );
};
