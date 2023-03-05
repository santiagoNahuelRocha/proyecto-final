import { useState, useContext, createContext, useEffect } from "react";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequest,
} from "../api/product";
import {
  addToCartRequest,
  deleteCartRequest,
  getCartRequest,
  restaCartRequest,
  sumaCartRequest,
} from "../api/cart";
import axios from "axios";
import Swal from "sweetalert2";
const productContext = createContext();

export const useProduct = () => {
  const context = useContext(productContext);
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Cart, setCart] = useState([]);

  const updateState = async () => {
    const cartURL = "http://localhost:8000/api/carrito";
    const cartList = await axios.get(cartURL);
    setCart(cartList.data);
  };

  const getCart = async () => {
    const res = await getCartRequest();
    setCart(res.data);
  };
  const addToCart = async (id) => {
    const newItem = products.find((product) => product._id === id);
    const exists = Cart.find((cart) => cart._id === newItem._id);
    if (exists) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "El producto ya existe en el carrito de compras",
        background: "#222",
        color: "#fff",
      });
    } else {
      Cart.push(newItem);
      await addToCartRequest(newItem);
    }
  };
  const suma = (id, cart) => {
    const nuevosProductos = [...Cart];
    const productoIndex = nuevosProductos.findIndex(
      (producto) => producto._id === id
    );
    nuevosProductos[productoIndex].unit += 1;
    setCart(nuevosProductos);
    const carrito = nuevosProductos[productoIndex];
    sumaCartRequest(id, carrito);
  };
  const deleteToCart = (id, cart) => {
    const nuevosProductos = [...cart];
    const productoIndex = nuevosProductos.findIndex(
      (producto) => producto._id === id
    );
    if (nuevosProductos[productoIndex].unit > 1) {
      nuevosProductos[productoIndex].unit -= 1;
      setCart(nuevosProductos);
      const carrito = nuevosProductos[productoIndex];
      restaCartRequest(id, carrito);
    } else {
      Swal.fire({
        title: "Estar seguro?",
        text: "Estas a punto de eliminar un producto de tu carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Elimiar!",
        background: "#222",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "Producto eliminar satisfactoriamente",
            icon: "success",
            background: "#222",
            color: "#fff",
          });
          const nuevosProductosFiltrados = nuevosProductos.filter(
            (producto) => producto._id !== id
          );
          setCart(nuevosProductosFiltrados);
          deleteCartRequest(id);
        }
      });
    }
  };
  useEffect(() => {
    updateState();
  }, []);
  const getProducts = async () => {
    const res = await getProductsRequest();

    setProducts(res.data);
  };

  const createProduct = async (values) => {
    try {
      const res = await createProductRequest(values);
      setProducts([...products, res.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: "Producto creado!",
        background: "#222",
        color: "#fff",
      });
    } catch (error) {
      if (error.response.data.message.length === 2) {
        // Si el servidor ha enviado un mensaje de error, muestra los 2 mensajes de error
        Swal.fire({
          icon: "error",
          title: "Error 1",
          text: error.response.data.message
            .map((err) => err.message)
            .join("\n \n"),
          background: "#222",
          color: "#fff",
        });
      } else if (error.response.data.message.length === 1) {
        // Si el servidor ha enviado un mensaje de error, muestra el mensaje de error

        Swal.fire({
          icon: "error",
          title: "Error 2",
          text: error.response.data.message.map((err) => err.message),
          background: "#222",
          color: "#fff",
        });
      } else if (error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Error 3",
          text: error.response.data.message,
          background: "#222",
          color: "#fff",
        });
      } else {
        // Si no hay un mensaje de error específico, muestra un mensaje genérico
        Swal.fire({
          icon: "error",
          title: "Error 4",
          text: "Se ha producido un error al crear el producto",
          background: "#222",
          color: "#fff",
        });
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Se ha producido un error al eliminar el producto",
        background: "#222",
        color: "#fff",
      });
    }
  };

  const getProduct = async (id) => {
    const res = await getProductRequest(id);
    return res.data;
  };

  const updateProduct = async (id, values) => {
    try {
      const res = await updateProductRequest(id, values);
      setProducts(
        products.map((values) => (values._id === id ? res.data : values))
      );
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: "Producto actualizado!",
        background: "#222",
        color: "#fff",
      });
    } catch (error) {
      if (error.response.data.message.length === 2) {
        // Si el servidor ha enviado un mensaje de error, muestra los 2 mensajes de error
        Swal.fire({
          icon: "error",
          title: "Error 1",
          text: error.response.data.message
            .map((err) => err.message)
            .join("\n \n"),
          background: "#222",
          color: "#fff",
        });
      } else if (error.response.data.message.length === 1) {
        // Si el servidor ha enviado un mensaje de error, muestra el mensaje de error

        Swal.fire({
          icon: "error",
          title: "Error 2",
          text: error.response.data.message.map((err) => err.message),
          background: "#222",
          color: "#fff",
        });
      } else if (error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Error 3",
          text: error.response.data.message,
          background: "#222",
          color: "#fff",
        });
      } else {
        // Si no hay un mensaje de error específico, muestra un mensaje genérico
        Swal.fire({
          icon: "error",
          title: "Error 4",
          text: "Se ha producido un error al crear el producto",
          background: "#222",
          color: "#fff",
        });
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <productContext.Provider
      value={{
        products,
        Cart,
        getProducts,
        createProduct,
        deleteProduct,
        getProduct,
        updateProduct,
        getCart,
        addToCart,
        deleteToCart,
        suma,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
