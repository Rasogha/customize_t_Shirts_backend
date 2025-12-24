import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        name: String,
        qty:{
            type: Number,
            default: 1
        },
        price: Number,
        selectedColor: String,
        selectedSize: String,
        //transparent PNG from Design Lab
        customDesignUrl:{
            type: String,
            required: true
        },
        //thumbnail for cart 
        previewUrl: String

    }]

},{timestamps: true})

const Cart = mongoose.model('carts',productSchema)

export default Cart

