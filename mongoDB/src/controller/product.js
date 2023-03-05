const Product = require("../models/product");
const { validationResult } = require("express-validator");
const { uploadImage, deleteImage, updateImage } = require("../lib/cloudinary");
const fs = require("fs-extra");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product !== undefined && product !== null) {
      res.json(product);
    } else {
      res.status(404).json({ user: null, msg: "usuario no encontrado" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const newProduct = async (req, res) => {
  try {
    const validator = validationResult(req);
    const { title, text, price, unit } = req.body;
    let image;
    if (validator.isEmpty()) {
      if (req.files.image) {
        const result = await uploadImage(
          req.files.image.tempFilePath,
          req.files.image.public_id
        );
        await fs.remove(req.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }
      const product = new Product({ title, text, price, unit, image });
      await product.save();
      res.json(product);
    } else {
      res.status(400).json({
        message: validator.array().map((err) => ({ message: err.msg })),
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const updateProduct = async (req, res) => {
  try {
    const validator = validationResult(req);
    const { title, text, price, unit } = req.body;
    let image;
    if (validator.isEmpty()) {
      console.log(req.files);
      if (req.files?.image) {
        const result = await updateImage(
          req.files.image.tempFilePath,
          req.body.prevImage
        );
        await fs.remove(req.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          { title, text, price, unit, image },
          { new: true }
        );
        res.status(200).json(product);
      } else {
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          { title, text, price, unit },
          { new: true }
        );
        res.status(200).json(product);
      }
    } else {
      res.status(400).json({
        message: validator.array().map((err) => ({ message: err.msg })),
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404);

    if (removed.image.public_id) {
      await deleteImage(removed.image.public_id);
    }
    res.status(204).json({ message: "producto eliminado" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  newProduct,
  deleteProduct,
  updateProduct,
};
