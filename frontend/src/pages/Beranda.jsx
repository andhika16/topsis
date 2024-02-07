import LoginForm from "../components/LoginForm";
import { AlternatifContext } from "../context/AlternatifContext";
import { useAlternatifContext } from "../hooks/useAlternatifContext";

const Beranda = () => {
  const alternatif = useAlternatifContext();
  console.log(alternatif);
  return (
    <div className="w-full bg-slate-100 px-20 pt-10">
      <div className="">
        <h1 className="font-semibold text-2xl">
          Selamat Datang Di Sistem Pendukung Keputusan
        </h1>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default Beranda;
