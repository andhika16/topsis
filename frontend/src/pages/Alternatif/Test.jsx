import React from "react";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";

function SimpleForm() {
  const { alternatifState } = useAlternatifContext();
  return (
    <div className="">
      <p>test hook</p>
      {alternatifState.map((data, i) => (
        <p key={i}>{data.nama_alternatif}</p>
      ))}
    </div>
  );
}

export default SimpleForm;
