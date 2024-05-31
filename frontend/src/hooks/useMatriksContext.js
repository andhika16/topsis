import { useContext } from "react";
import { MatriksContext } from "../context/MatriksContext";
export const useMatriksContext = () => {
  const context = useContext(MatriksContext);
  if (!context) {
    throw new Error(
      "useMatriksContext must be used within a KriteriaProvider"
    );
  }
  return context;
};
