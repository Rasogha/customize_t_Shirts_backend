import Product from "../models/product.js"
import { isItAdmin } from "./userController.js"

export async function addProduct(req, res) {

    let isAdmin = isItAdmin(req)

    if(req.user == null){
        res.status(401).json({messege: "Please Login and try again."})
        return
    }
    if(!isAdmin){
        res.status(403).json({messege: "Access denied. Admins only can add products."})
        return
    }

    const data = req.body
    const newProduct = new Product(data)

    try{
        await newProduct.save()
        res.json({message: "Product added successfully"})
    }catch(error){
        res.status(500).json({message: "product registration failed"})
    }

}

export async function getAllProducts(req, res) {
    let isAdmin = isItAdmin(req)

    try{
        if(req.user == null){
            res.status(401).json({messege: "Please Login and try again."})
            return
        }
        if(isAdmin){
            const products = await Product.find()
            res.json(products)
            return
        }else{
            const products = await Product.find({countInStock: {$gt: 0}})
            res.json(products)
            return
        }

    }catch(error){
        res.status(500).json({message: "Failed to get products"})
    }
}

export async function updateProduct(req, res) {
    let isAdmin = isItAdmin(req)
    try{
        if(isAdmin){
            const key = req.params.key
            const data = req.body
            await Product.updateOne({key: key}, data)
            res.json({message: "Product updated successfully"})
            return
        }else{
            res.status(403).json({message: "Access denied. Admins only can update products."})
        }
    }catch(error){
        res.status(500).json({message: "Failed to update product"})

    }


}