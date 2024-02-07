import React, { useEffect } from "react";
import AlternatifForm from "./AlternatifForm";
import { useAlternatifContext } from "../../hooks/useAlternatifContext";
import { AlternatifDetail } from "./AlternatifDetail";
const Alternatif = () => {
  const { alternatifState } = useAlternatifContext();

  return (
    <div>
      <div className="flex flex-wrap">
        <AlternatifForm />
        {alternatifState.map((data, i) => (
          <AlternatifDetail key={i} alternatif={data} />
        ))}
      </div>
    </div>
  );
};

export default Alternatif;
