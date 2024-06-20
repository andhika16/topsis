import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Perbaikan di sini: mengimpor sebagai named export

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
