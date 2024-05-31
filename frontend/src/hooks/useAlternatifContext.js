import { useContext } from "react";
import { AlternatifContext } from "../context/AlternatifContext"; // Perbaikan di sini: mengimpor sebagai named export

export const useAlternatifContext = () => {
  const context = useContext(AlternatifContext);
  if (!context) {
    throw new Error(
      "useAlternatifContext must be used within an AlternatifProvider"
    );
  }
  return context;
};
  