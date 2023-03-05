import axios from "axios";

export const getCartRequest = async () =>
  await axios.get("http://localhost:8000/api/carrito");

export const addToCartRequest = async (product) =>{
  return await axios.post("http://localhost:8000/api/carrito",product);
}

export const deleteToCartRequest = async (id) =>
  await axios.delete(`http://localhost:8000/api/carrito/${id}`);

export const sumaCartRequest = async (id, value) => {
  return await axios.put(`http://localhost:8000/api/carrito/${id}`, value);
}
export const restaCartRequest = async (id, value) => {
  return await axios.put(`http://localhost:8000/api/carrito/${id}`, value);
}

export const deleteCartRequest = async (id) => {
  await axios.delete(`http://localhost:8000/api/carrito/${id}`)
}
