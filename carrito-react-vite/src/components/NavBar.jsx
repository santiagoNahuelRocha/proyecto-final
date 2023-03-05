import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="bg-zinc-900  flex justify-evenly items-center h-20 ">
      <li>
        <Link
          to="/"
          className=" text-xl text-white hover:border-green-400 border-solid border-b-2 border-red-600 ease-in duration-200"
        >
          Inicio
        </Link>
      </li>
      <li>
        <Link
          to="/Productos"
          className=" text-xl text-white hover:border-green-400 border-solid border-b-2 border-red-600 ease-in duration-200"
        >
          Productos
        </Link>
      </li>
      <li>
        <Link
          to="/Crear"
          className="text-xl text-white hover:border-green-400 border-solid border-b-2 border-red-600 ease-in duration-200"
        >
          Crear
        </Link>
      </li>
      <li>
        <Link
          to="/Carrito"
          className="text-xl text-white hover:border-green-400 border-solid border-b-2 border-red-600 ease-in duration-200"
        >
          Carrito
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
