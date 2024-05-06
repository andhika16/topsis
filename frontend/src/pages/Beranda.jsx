import LoginForm from "../components/LoginForm";
import { AlternatifContext } from "../context/AlternatifContext";
import { useAlternatifContext } from "../hooks/useAlternatifContext";
import { AlternatifDetail } from "./Alternatif/AlternatifDetail";

const Beranda = () => {
  const { alternatifState } = useAlternatifContext();
  return (
    <div className="w-full  bg-slate-200 px-20 pt-10">
      <div className="flex flex-wrap">
        {alternatifState.map((data, i) => (
          <AlternatifDetail key={i} alternatif={data} />
        ))}
      </div>
    </div>
  );
};

export default Beranda;
