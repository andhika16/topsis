import { MatriksContext } from "../context/MatriksContext";
import { useContext } from "react";

export const useMatriksContext = () => {
  const context = useContext(MatriksContext);
  if (!context) {
    throw new Error("useMatriksContext must be used within a MatriksProvider");
  }
  return context;
};
