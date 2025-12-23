import express from "express"
import { addProduct, getAllProducts, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post('/', addProduct)
productRouter.get('/', getAllProducts)
productRouter.put('/:key', updateProduct)

export default productRouter