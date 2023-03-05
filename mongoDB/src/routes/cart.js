const express = require("express");
const { addToCart, cart, updateCart, deleteToCart } = require("../controller/cart");

const router = express.Router();

router.get('/', cart)
router.post('/', addToCart)
router.put('/:id', updateCart)
router.delete('/:id', deleteToCart)
module.exports = router