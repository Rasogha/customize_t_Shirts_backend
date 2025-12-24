import express from 'express'
import { placeOrder, getMyOrders, updateOrderStatus, getAllOrders } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', placeOrder)
orderRouter.get('/myorders', getMyOrders)
orderRouter.get('/', getAllOrders)
orderRouter.put('/:id', updateOrderStatus)

export default orderRouter