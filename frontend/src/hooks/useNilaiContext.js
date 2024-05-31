import { useContext } from "react";
import { NilaiContext } from "../context/NilaiContext";

export const useNilaiContext = () => {
  const context = useContext(NilaiContext);
  if (!context) {
    throw new Error("useMatriksContext must be used within a KriteriaProvider");
  }
  return context;
};
