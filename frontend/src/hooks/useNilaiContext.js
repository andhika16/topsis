import { NilaiContext } from "../context/NilaiContext";
import { useContext } from "react";

export const useNilaiContext = () => {
  const context = useContext(NilaiContext);
  if (!context) {
    throw new Error("useNilaiContext must be used within a MatriksProvider");
  }
  return context;
};
