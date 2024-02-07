import { KriteriaContext } from "../context/KriteriaContext";
import { useContext } from "react";
export const useKriteriaContext = () => {
  const context = useContext(KriteriaContext);
  if (!context) {
    throw new Error(
      "useKriteriaContext must be used within a KriteriaProvider"
    );
  }
  return context;
};
