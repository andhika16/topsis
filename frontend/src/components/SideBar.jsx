import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart_fill,
  Chat,
  User,
  Logo,
  Control,
  Calendar,
  Search,
  Chart,
  Folder,
  Setting,
} from "../assets/sidebar";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { link: "/", title: "Beranda", src: Chart_fill },
    { link: "/nilai_matriks", title: "Nilai ", src: Chart_fill },
    {
      link: "/alternatif_form",
      title: "Form Penduduk",
      src: Chat,
      gap: true,
    },
    { link: "/penilaian", title: "Form Kriteria", src: Chat },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-slate-900 h-screen max-h-full p-5  pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-900
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-1xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Sistem Pendukung Keputusan
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={Menu.src} />
              <Link
                to={Menu.link}
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                {Menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
