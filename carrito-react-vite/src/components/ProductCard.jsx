import toast from "react-hot-toast";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct, addToCart } = useProduct();
  const add = (id) => {
    addToCart(id);
  };
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            estas seguro de eliminar <strong>{id}</strong>
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-600 px-3 py-2 text-sm text-white"
              onClick={() => {
                deleteProduct(id);
                toast.dismiss(t.id);
              }}
            >
              eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };
  return (
    
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-2xl shadow-black hover:bg-zinc-700 hover:cursor-pointer h-96 w-9/12"
      onClick={() => navigate(`/producto/${product._id}`)}
    >
      <div className="px-4 py-7 flex flex-col h-full justify-between">
        <div className="h-52 flex justify-center w-full">

        {product.image ? (
          <img src={product.image.url} className="h-full mb-3 w-full" />
        ) : (
          <div className="h-full flex justify-center items-center bg-white mb-3">
            <MdOutlineImageNotSupported className="text-gray-400" fontSize="10rem"/>
          </div>
        )}
        </div>


        <div>
          <h3 className="text-white half-text">{product.title}</h3>
          <h3 className=" text-zinc-400 half-text">{product.text}</h3>
          <h3 className=" text-zinc-400 half-text">${product.price}</h3>
        </div>
        <div className="flex justify-center align-bottom">
          <button
            className="bg-green-700 hover:bg-green-600 rounded-sm text-sm px-2 py-3 w-full mr-1 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              add(product._id);
              navigate("/Carrito");
            }}
          >
            añadir
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 rounded-sm text-sm px-2 py-3 w-full ml-1 uppercase"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product._id);
            }}
          >
            eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
