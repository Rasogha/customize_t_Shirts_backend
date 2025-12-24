import Cart from "../models/cart.js"
import { isItCustomer} from "./userController.js"

export async function syncCart(req,res){
    const isCustomer = isItCustomer(req)
    
    if(!isCustomer){
        res.status(403).json({message: "Access denied. Customers only can sync cart."})
        return
    }

    const userId = req.user._id
    const {localCartItems} = req.body

    if(!localCartItems || localCartItems.length == 0){
        res.status(400).json({message: "No cart items to sync"})
        return
    }

    try{
        let cart = await Cart.findOne({user: userId})

        if(!cart){
            cart = new Cart({
                user: userId,
                cartItems: localCartItems
            })
        }else{
            localCartItems.forEach((localItem)=>{
                cart.cartItems.push(localItem)
            })
        }

        await cart.save()
        res.json({message: "Cart synchronized successfully"})

    }catch(error){
        res.status(500).json({message: "Cart sync failed"})
    }
}

export async function getUserCart(req,res){ //fetch the saved cart when customer refresh
    const isCustomer = isItCustomer(req)

    if(!isCustomer){
        res.status(403).json({message: "Access denied. Customers only can access cart."})
        return
    }

    try{
        const userId = req.user._id
        const cart = await Cart.findOne({user: userId}).populate('cartItems.product')

        if(cart){
            res.json(cart)
            return
        }else{
            res.json({cartItems: []}) //Return empty structure if no cart found
            return
        }

    }catch(error){ 
        res.status(500).json({message: "Failed to fetch cart"})
    }

}

export async function addToCart(req,res){// if login , directly add to cart
    const isCustomer = isItCustomer(req)
    if(!isCustomer){
        res.status(403).json({message: "Access denied. Customers only can add to cart."})
        return
    }

    try{
        const userId = req.user._id    
        const item = req.body           //product, coustomDesignUrl etc
       
        let cart = await Cart.findOne({user: userId})

        if(!cart){
            cart = new Cart({ user: userId, cartItems: [item] })
        }else{
            cart.cartItems.push(item) //add new item to existing cart in local array
        }

        await cart.save()
        res.json({message: "Item added to cart successfully"})

    }catch(error){
        res.status(500).json({message: "Failed to add item to cart"})
    }
}
