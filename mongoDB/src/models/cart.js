const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    required: true
  },
  image: {
    url: String,
    public_id: String,
}
});

const Cart = mongoose.model('carrito', cartSchema)

module.exports = Cart;
