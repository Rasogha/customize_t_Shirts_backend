import express from "express"
import { addProduct, getAllProducts, updateProduct, getProductById, deleteProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post('/', addProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductById)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)


export default productRouter