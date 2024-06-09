import React, { useEffect, useState } from "react";
import AlternatifForm from "./AlternatifForm";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import { useParams } from "react-router-dom";

const AlternatifUpdate = () => {
  const { id } = useParams(); // Ambil nilai id dari params
  const { state } = useAlternatifContext();
  const { data } = state;
  const [initialData, setInitialData] = useState(null);

  // Gunakan useEffect untuk mencari data berdasarkan id saat komponen dimuat
  useEffect(() => {
    if (id && data.length > 0) {
      const foundUser = data.find((item) => item.id === parseInt(id));
      if (foundUser) {
        setInitialData(foundUser);
      } else {
        console.error(`User with id ${id} not found`);
        // Handle case when user with id not found
      }
    }
  }, [id, data]);

  return (
    <div>
      {initialData ? (
        <AlternatifForm editMode={true} initialData={initialData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AlternatifUpdate;
