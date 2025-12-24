import express from "express"
import {syncCart, getUserCart, addToCart} from "../controllers/cartController.js"

const cartRouter = express.Router()

cartRouter.post('/sync', syncCart)
cartRouter.get('/', getUserCart)
cartRouter.post('/', addToCart)


export default cartRouter

