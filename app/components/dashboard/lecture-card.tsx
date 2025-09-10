import Icon from "~/components/utils/icons";
import { Button } from "~/components/ui/button";
import { percentageFormarter } from "~/lib/formarterts";

type LectureCard = {
  label: string;
  number: number;
  completed?: boolean;
};

export const LectureCard = ({ data }: { data: LectureCard }) => {
  const { label, number, completed } = data;

  const handlePrint = () => {
    console.log(data);
  };

  return (
    <li
      key={label}
      className="flex flex-col p-4 gap-8 justify-between border-r border-b"
    >
      <div className="flex items-start gap-2">
        <h4 className="text-base font-light">{label}</h4>
        {completed && (
          <Icon
            name="verified"
            className="fill-blue-500 text-background dark:text-gray-300 size-4"
          />
        )}
      </div>
      <div className="space-y-2">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handlePrint}
          disabled={!Boolean(completed)}
        >
          <Icon name="print" />
          Print
        </Button>
        <p className="font-mono text-[10px] text-foreground/50">
          At least{" "}
          <span className="text-foreground font-medium">
            {percentageFormarter(number / 100)}
          </span>{" "}
          of fees has to be completed
        </p>
      </div>
    </li>
  );
};
