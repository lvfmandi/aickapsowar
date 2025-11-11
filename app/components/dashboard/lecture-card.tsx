import { toast } from "sonner";
import { useState, useTransition } from "react";

import { getCard } from "~/api/cards/getCard";

import type { CardType } from "~/lib/types/cards";
import { percentageFormarter } from "~/lib/formarterts";

import Icon from "~/components/utils/icons";
import { PdfDrawer } from "~/components/utils/pdf-drawer";

type LectureCard = {
  label: string;
  base64: string;
  number: number;
  cardType: CardType;
  completed?: boolean;
};

export const LectureCard = ({ data }: { data: LectureCard }) => {
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const { label, number, completed, cardType } = data;

  const [base64, setBase64] = useState<string | null>(null);

  const handlePrint = () => {
    setOpen(true);
    startTransition(async () => {
      const { data, error } = await getCard({ cardType });

      if (error) {
        setOpen(false);
        toast.error(error);
      }
      console.log({ data });
      if (!data || data === "") {
        setOpen(false);
        toast.warning("No report was found");
      }
      if (data) setBase64(data ?? null);
    });
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
      <div className="grid gap-2">
        <PdfDrawer
          open={open}
          base64={base64}
          documentTitle={label}
          title={`${label}`}
          handlePrintDoc={handlePrint}
          handleOnClose={() => setOpen(false)}
          description={`You can print or download the ${label}`}
        />
        <p className="font-mono text-[10px] text-foreground/50">
          {number === 100 ? (
            <span>
              All your fees have to be fully paid in order to print the exam
              card.
            </span>
          ) : (
            <span>
              At least{" "}
              <span className="text-foreground font-medium">
                {percentageFormarter(number / 100)}
              </span>{" "}
              of fees has to be completed.
            </span>
          )}
        </p>
      </div>
    </li>
  );
};
