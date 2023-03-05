const Cart = require("../models/cart");

const cart = async (req, res) => {
    const cart = await Cart.find()
    res.json(cart)
}

const addToCart = async (req, res) => {
    try {
        const {title, text, price, unit} = req.body
        let image = req.body.image
        const cart = new Cart({title, text, price, unit, image})
        await cart.save()
        res.json(cart)
    } catch (error) {
        console.log(error)
    }

}

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(cart)
    } catch (error) {
        console.log(error.message)        
    }
}

const deleteToCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id)
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {cart, addToCart, updateCart, deleteToCart}