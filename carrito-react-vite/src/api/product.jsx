import axios from "axios";

export const getProductsRequest = async () =>
  await axios.get("http://localhost:8000/api/productos");

export const createProductRequest = async (product) =>{
  const form = new FormData()

  for(let key in product){
    form.append(key, product[key])
  }
  return await axios.post("http://localhost:8000/api/productos",form,{
  headers:{
    "Content-Type": "multipart/form-data"
  }
  });
}

export const deleteProductRequest = async (id) =>
  await axios.delete(`http://localhost:8000/api/productos/${id}`);

export const getProductRequest = async (id) =>
  await axios.get(`http://localhost:8000/api/productos/${id}`);

export const updateProductRequest = async (id, newFields) =>{
  const form = new FormData()
  for(let key in newFields){
    form.append(key, newFields[key])
  }
  return await axios.put(`http://localhost:8000/api/productos/${id}`,form,{
  headers:{
    "Content-Type": "multipart/form-data"
  }
  });
}
