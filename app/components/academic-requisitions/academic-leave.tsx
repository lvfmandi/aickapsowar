import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const AcedmicLeave = () => {
  const data: { value: string; description: string }[] = [
    { value: "1", description: "Financial Leave" },
    { value: "2", description: "Medical Leave" },
    { value: "3", description: "Compassionate Leave" },
  ];

  return (
    <div className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          1. Reason
        </h4>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Reason"} />
          </SelectTrigger>
          <SelectContent>
            {data.map(({ value, description }) => {
              return (
                <SelectItem key={value} value={value}>
                  {`${description}`}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          2. Attached Document
        </h4>
        <Input type="file" accept="img" />
      </div>
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          3. Supporting Reason
        </h4>
        <Input placeholder="Other Reason" />
      </div>
      <div className="space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          4. Submit Requistion
        </h4>
        <Button className="w-full">Submit Requisition</Button>
      </div>
    </div>
  );
};
