import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const ChangeOfProgram = () => {
  const data2: { value: string; description: string }[] = [
    { value: "3", description: "Health Service Support Level 5" },
    { value: "1", description: "Perioperative Theatre Technology Level 5" },
    { value: "2", description: "Perioperative Theatre Technology Level 6" },
  ];

  return (
    <div className="py-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
      <div className="flex flex-col justify-between space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          1. Attach KCSE Result Slip & Admission Letter
        </h4>
        <Input type="file" accept="img" />
      </div>
      <div className="flex flex-col justify-between space-y-4">
        <h4 className="text-base font-light lg:text-sm lg:font-normal text-muted-foreground">
          2. Choose Course
        </h4>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Course"} />
          </SelectTrigger>
          <SelectContent>
            {data2.map(({ value, description }) => {
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
          3. Submit Requistion
        </h4>
        <Button className="w-full">Submit Requisition</Button>
      </div>
    </div>
  );
};
