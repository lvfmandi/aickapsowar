import { AuthImage } from "~/components/auth/auth-image";

/* 
  Dependencies: imgSrc: string & children: preferrably a FormWrapper but can also be a form
  Renders the FormWrapper & the AuthImage which takes the imgSrc
*/

export const AuthWrapper = ({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-8 h-screen container lg:px-0 items-center justify-center lg:justify-stretch lg:grid-cols-2">
      {children}
      <AuthImage src={src} />
    </div>
  );
};
