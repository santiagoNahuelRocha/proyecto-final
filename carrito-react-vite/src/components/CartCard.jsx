import React from "react";
import { useProduct } from "../context/ProductContext";
import { MdOutlineImageNotSupported } from "react-icons/md";

const CartCard = ({ product }) => {
  const { deleteToCart, Cart, suma } = useProduct();
  function sumar(id, data) {
    suma(id, data);
    // console.log(id,data)
  }
  function resta(id, data) {
    // console.log(id,data)
    deleteToCart(id, data);
  }
  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-2xl shadow-black hover:bg-zinc-700 hover:cursor-pointer h-96 w-9/12">
      <div className="px-4 py-7 flex flex-col h-full justify-between">
        <div className="h-52 flex justify-center w-full">
          {product.image ? (
            <img src={product.image.url} className="h-full mb-3 w-full" />
          ) : (
            <div className="h-full flex justify-center items-center bg-white mb-3">
              <MdOutlineImageNotSupported
                className="text-gray-400"
                fontSize="10rem"
              />
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-white half-text">{product.title}</h3>
          <h3 className=" text-zinc-400 half-text">${product.price}</h3>
          <h3 className=" text-zinc-400 half-text">Unidades: {product.unit}</h3>
        </div>
        <div className="flex justify-center align-bottom">
          <button
            className="bg-green-700 hover:bg-green-600 rounded-sm text-sm px-2 py-3 w-full mr-1 uppercase"
            onClick={() => sumar(product._id, Cart)}
          >
            Sumar
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 rounded-sm text-sm px-2 py-3 w-full ml-1 uppercase"
            onClick={() => resta(product._id, Cart)}
          >
            {product.unit == 1 ? "Eliminar" : "Restar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
