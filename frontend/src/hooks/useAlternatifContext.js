import { AlternatifContext } from "../context/AlternatifContext";
import { useContext } from "react";
export const useAlternatifContext = () => {
  const context = useContext(AlternatifContext);
  if (!context) {
    throw new Error(
      "useAlternatifContext must be used within an AlternatifProvider"
    );
  }
  return context;
};
