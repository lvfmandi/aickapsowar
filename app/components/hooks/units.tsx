import { createContext, useContext, useState, type ReactNode } from "react";

type UnitsProviderContext = {
  showUnits: boolean;
  currentSemester: string | null;
  setShowUnits: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSemester: React.Dispatch<React.SetStateAction<string | null>>;
};

const UnitsContext = createContext<UnitsProviderContext | null>(null);

export default function UnitsProvider({ children }: { children: ReactNode }) {
  const [showUnits, setShowUnits] = useState(false);
  const [currentSemester, setCurrentSemester] = useState<string | null>(null);

  return (
    <UnitsContext.Provider
      value={{
        showUnits,
        setShowUnits,
        currentSemester,
        setCurrentSemester,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

export const useUnits = () => {
  const unitsContext = useContext(UnitsContext);
  if (!unitsContext) {
    throw "Kindly use the useUnits hook within the UnitsProvider";
  }

  return unitsContext;
};
