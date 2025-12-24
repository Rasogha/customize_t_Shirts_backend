import Order from "../models/order.js"
import { isItCustomer, isItAdmin } from "./userController.js"

export async function placeOrder(req, res) {
    const isCustomer = isItCustomer(req)

    if(!isCustomer){
        res.status(403).json({message: "Access denied. Log in as a customer and try again"})
        return
    }

    try{
        const userId = req.user._id // from JWT
        const{
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice 
        } = req.body

        if (!orderItems || orderItems.length === 0) {
            res.status(400).json({message: "No order items"})
            return
        }

    
        const order = new Order({
                user: userId,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                isPaid: true, // Assuming instant payment 
                paidAt: Date.now(),
                status: "Pending" //default status for admin view
        })

        const placedOrder = await order.save()
        res.status(201).json({  
            message: "Order placed successfully",
            order: placedOrder  // Return the all placed order details
        })   

    }catch(error){
        res.status(500).json({message: "Order placement failed"})
    }
}

export async function getMyOrders(req, res) {
    const isCustomer = isItCustomer(req)
    if(!isCustomer){
        res.status(403).json({message: "Access denied. Log in as a customer and try again"})
        return
    }

   try{
        const userId = req.user._id
        const orders = (await Order.find({user: userId})).toSorted({createdAt: -1})
        res.json(orders)
   }catch(error){
        res.status(500).json({message: "Failed to get your orders"})
   }

}

export async function getAllOrders(req, res) {
    const isAdmin = isItAdmin(req)
    if(!isAdmin){
        res.status(403).json({message: "Access denied"})
        return
    }

    try{
        const orders = (await Order.find().populate('user', 'id firstName lastName email')).toSorted({createdAt: -1})
        res.json(orders)
    }catch(error){
        res.status(500).json({message: "Failed to get all orders"})
    }

}

export async function updateOrderStatus(req, res) {
    const isAdmin = isItAdmin(req)
    if(!isAdmin){
        res.status(403).json({message: "Access denied"})
        return
    }
    
    try{
        const {id} = req.params
        const {status} = req.body

        const order = await Order.findById(id)
        if(order){
            order.status = status
            if(status === "shipped"){
                order.shippedAt = Date.now()
            }
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404).json({message: "Order not found"})
        }
    }catch(error){
        //If req.body was null, it also handled here
        res.status(500).json({message: "Failed to update order status", error: error.message})
    }
}
