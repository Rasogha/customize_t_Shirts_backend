//correct after checkings the try catch blocks
import Sticker from "../models/sticker.js"
import { isItAdmin } from "./userController.js"

export async function addSticker(req, res) {
    let isAdmin = isItAdmin(req)
    if(!isAdmin){
        res.status(403).json({messege: "Access denied. Admins only can add stickers."})
        return
    }

    try{
        const { name, image, category, price } = req.body
        const newSticker = new Sticker({
            name,
            image,
            category,
            price: price || 0
        })

        const savedSticker = await newSticker.save()
        res.status(201).json(savedSticker)
    }catch(error){
        res.status(500).json({message: "Failed to add sticker"})
    }
}

export async function getStickers(req, res) {
    try{
        //optional: add filters later |||||| but no another way
         const keywords = req.query.category ? {
         category: req.query.category
         }:{}
        
        const stickers = await Sticker.find({...keywords})
        res.json(stickers)
    }catch(error){
        res.status(500).json({message: "Failed to get stickers"})
    }
}

export async function deleteSticker(req, res) {
    let isAdmin = isItAdmin(req)
    if(!isAdmin){
        res.status(403).json({messege: "Access denied. Admins only can delete stickers."})
        return
    }
    try{
        const {id} = req.params._id
        const deletedSticker = await Sticker.findByIdAndDelete(id)
        if(deletedSticker){     //mongodb returns the data of deleted document
            res.status(200).json({message: "Sticker deleted successfully"})
        }else{
            res.status(404).json({message: "Sticker not found"})
        }
    }catch(error){
        res.status(500).json({message: "Failed to delete sticker"})
    }
}