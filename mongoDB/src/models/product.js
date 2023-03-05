const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
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

const Product = mongoose.model('producto', productSchema)

module.exports = Product;
