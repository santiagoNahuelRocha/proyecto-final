const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const validateProduct = require("../middleware/validateProduct");

//LISTA DE PRODUCTOS
router.get("/", getProducts);
//UN PRODUCTO POR ID
router.get("/:id", getProduct);
//CREAR PRODUCTO
router.post(
  "/",
  validateProduct,
  [
    body("title")
      .notEmpty()
      .withMessage("Debe ingresar un titulo")
      .isLength({ min: 5 })
      .withMessage("El titulo debe tener al menos 5 caracteres."),
    body("text")
      .notEmpty()
      .withMessage("Debe ingresar una descripción")
      .isLength({ min: 5 })
      .withMessage("La descripcion debe tener al menos 5 caracteres."),
    body("price").notEmpty().withMessage("Debe ingresar un precio"),
  ],
  newProduct
);
//ACTUALIZAR PRODUCTO POR ID
router.put(
  "/:id",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("El titulo debe tener al menos 5 caracteres."),
    body("text")
      .isLength({ min: 5 })
      .withMessage("La descripcion debe tener al menos 5 caracteres."),
  ],
  updateProduct
);
// BORRAR PRODUCTO POR ID
router.delete("/:id", deleteProduct);

module.exports = router;
