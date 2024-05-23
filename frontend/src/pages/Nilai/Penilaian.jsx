import React from "react";
import AlternatifForm from "../Alternatif/AlternatifForm";
import KriteriaForm from "../Kriteria/KriteriaForm";
import MatriksForm from "../Matriks/MatriksForm";

const Penilaian = () => {
  return (
    <div className="flex m-1">
      <KriteriaForm />
      <MatriksForm />
    </div>
  );
};

export default Penilaian;
