import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProduct } from "../context/ProductContext";
import { VscEmptyWindow } from "react-icons/vsc";
import ProductCard from "../components/ProductCard";
import CartCard from "../components/CartCard";

const Cart = () => {
  const { deleteToCart, Cart, suma } = useProduct();
  const total = Cart.reduce((acc, item) => acc + item.price, 0);
  function sumar(id, data) {
    suma(id, data);
    // console.log(id,data)
  }
  function resta(id, data) {
    // console.log(id,data)
    deleteToCart(id, data);
  }

  if (Cart.length === 0)
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <VscEmptyWindow className="w-48 h-40 mb-5" />
        <h1 className="text-zinc-400">No hay productos en en Carrito</h1>
      </div>
    );
  return (
    <div className="h-full mx-5 my-10">
      <h2 className="text-white text-3xl">Carrito de compras</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-11">
        {Cart.map((product) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
      <h4 className="text-white text-2xl my-11">total: ${total}</h4>
    </div>
  );
};

export default Cart;
