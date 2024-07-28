import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart_fill,
  Chat,
  User,
  fa1,
  fa2,
  fa3,
  Logo,
  miskin,
  Control,
  Calendar,
  Search,
  Chart,
  Folder,
  Setting,
} from "../assets/sidebar";
import { useAuthContext } from "../hooks/useAuthContext";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const { logout } = useAuthContext();
  const Menus = [
    { link: "/", title: "Beranda", src: Chart_fill },
    { link: "/nilai_matriks", title: "Nilai ", src: Chart_fill },
    {
      link: "/alternatif_form",
      title: "Form Penduduk",
      src: User,
      gap: true,
    },
    { link: "/penilaian", title: "Form Kriteria", src: Folder },
    { link: "/bobot", title: "Form Bobot ", src: Setting },
  ];

  return (
    <div className="flex ">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-slate-950 h-screen max-h-full p-5    pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-900
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center">
          <img src={fa2} className="w-20" />
          <h1
            className={`flex flex-col text-white origin-left font-medium text-1xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Sistem Pendukung Keputusan{" "}
            <span className="text-xs capitalize">desa tatung</span>
          </h1>
        </div>
        <ul className="pt-0">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-start gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.link}>
                <img src={Menu.src} />
              </Link>
              <Link
                to={Menu.link}
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                {Menu.title}
              </Link>
            </li>
          ))}
          <li className="mt-2 p-2 ">
            <button
              className="rounded p-2 xs:px-6 text-sm text-gray-900 font-bold text-center mt-10  bg-gray-100 space-x-3"
              onClick={logout}
            >
              <i className="fa-solid fa-sign-out-alt"></i>
              {open && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
