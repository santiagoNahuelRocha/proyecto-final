import { Formik, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ProductForm = () => {
  const { createProduct, getProduct, updateProduct } = useProduct();
  const [product, setProduct] = useState({
    title: "",
    text: "",
    price: "",
    unit: "1",
    image: null,
    prevImage: ""
  });
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    (async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setProduct({
          title: product.title,
          text: product.text,
          price: product.price,
          unit: product.unit,
          image: product.image,
          prevImage: product.image.public_id
        });
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-2xl shadow-black " style={{width: "400px"}}>
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl text-white">
            {" "}
            {params.id ? "editar producto" : "nuevo producto"}
          </h3>
          <Link
            to="/productos"
            className="text-gray-400 text-sm hover:text-gray-300"
          >
            Volver
          </Link>
        </header>
        <Formik
          initialValues={product}
          enableReinitialize
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateProduct(params.id, values);
            } else {
              await createProduct(values);
            }
            navigate("/Productos");
          }}
        >
          {({ handleSubmit, setFieldValue, values, handleChange, isSubmitting}) => (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-white "
              >
                Titulo
              </label>
              <Field
                name="title"
                placeholder="Titulo"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-3"
              />
              <label
                htmlFor="text"
                className="text-sm block font-bold text-white "
              >
                Descripción
              </label>
              <Field
                component="textarea"
                name="text"
                rows="5"
                placeholder="descripción del producto"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-3"
              />
              <label
                htmlFor="price"
                className="text-sm block font-bold text-white "
              >
                Precio
              </label>
              <Field
                type="number"
                name="price"
                placeholder="Precio"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <Field
                type="hidden"
                name="unit"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-white "
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none bg-gray-600 rounded text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <input type="hidden" value={values.prevImage} onChange={handleChange} />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400 w-full"
              >
                {isSubmitting ? "Cargando": "Guardar"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
