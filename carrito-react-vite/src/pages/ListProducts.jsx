import React from 'react';
import { useProduct } from '../context/ProductContext';
import { VscEmptyWindow } from "react-icons/vsc";
import ProductCard from '../components/ProductCard';


const ListProducts = () => {
    const {products} = useProduct()
    if (products.length === 0)
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <VscEmptyWindow className="w-48 h-40 mb-5" />
        <h1 className='text-zinc-400'>No hay productos en la lista</h1>
      </div>
    )
    return (
      <div className='h-full mx-5 my-10'>
      <h2 className='text-white text-3xl'>Lista de productos</h2>

        <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-11">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
        </div>
      </div>


    );
}

export default ListProducts;
