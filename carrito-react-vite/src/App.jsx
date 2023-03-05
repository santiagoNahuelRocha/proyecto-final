import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { ProductProvider } from "./context/ProductContext";
import ListProducts from "./pages/ListProducts";
import { toast, Toaster } from "react-hot-toast";
import { ProductForm } from "./pages/ProductForm";
import Cart from "./pages/Cart";
function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="bg-neutral-800 flex flex-col justify-between altura">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Productos" element={<ListProducts />}></Route>
            <Route path="/Crear" element={<ProductForm />}></Route>
            <Route path="/Producto/:id" element={<ProductForm />}></Route>
            <Route path="/Carrito" element={<Cart />}></Route>
          </Routes>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ProductProvider>
  );
}

export default App;
