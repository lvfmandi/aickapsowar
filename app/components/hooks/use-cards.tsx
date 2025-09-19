import { CardType } from "~/lib/types/cards.d";

export const useCards = () => {
  const lectureCards = [
    {
      number: 60,
      completed: true,
      label: "Temp. Card",
      description: "Temporary Card",
      cardType: CardType.TemporaryLC,
    },
    {
      number: 80,
      completed: true,
      label: "Perm. Card",
      description: "Permanent Card",
      cardType: CardType.PermanentLC,
    },
    {
      number: 100,
      completed: true,
      label: "Exam Card",
      description: "Exam Card",
      cardType: CardType.ExamCard,
    },
  ];

  return { lectureCards };
};
