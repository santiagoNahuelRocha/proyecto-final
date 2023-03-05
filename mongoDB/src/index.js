const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const db = require('./database/db')
const fileupload = require('express-fileupload')

const products = require('./routes/products')
const cart = require('./routes/cart')
app.use(express.json())
app.use(fileupload({
    useTempFiles:true,
    tempFileDir: "./upload"
}))
app.use(cors())

app.use('/api/productos', products)
app.use('/api/carrito', cart)
app.listen(port, ()=> {
    console.log(`server on port http://localhost:${port}`)
})
db()