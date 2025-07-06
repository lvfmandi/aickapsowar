/* This is an AuthImage that takes in an image src and displays it as a background image */

export const AuthImage = ({ src }: { src: string }) => {
  return (
    <div className="hidden lg:grid w-full h-full">
      <div
        className="relative w-full h-full bg-background"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${src})`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/20">&nbsp;</div>
      </div>
    </div>
  );
};
