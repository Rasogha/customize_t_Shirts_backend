import mongoose from "mongoose"

const stickerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,// URL
        required: true
    },
    category:{
        type: String,//funny.abstract etc
        required: true
    },
    price:{
        type: Number,
        defalt: 0 // optional :- charge  for premium stickers
    }
},{timestamps: true})

const Sticker = mongoose.model('stickers', stickerSchema)
export default Sticker