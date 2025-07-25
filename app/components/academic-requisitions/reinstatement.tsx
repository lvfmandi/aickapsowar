import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const Reinstatement = () => {
  return (
    <div className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2">
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          1. Reason
        </h4>
        <Input placeholder="Reason" />
      </div>
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          2. Submit Requistion
        </h4>
        <Button className="w-full">Submit Requisition</Button>
      </div>
    </div>
  );
};
