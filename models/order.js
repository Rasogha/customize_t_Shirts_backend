import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    orderItems:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            selectedSize: String,
            selectedColor: String,
            //Admin download
            printFileUrl:{type: String, required: true},
            previewUrl: String
        }
    ],
    shippingAddress:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod:{type: String,required: true},
    itemsPrice:{type: Number, required: true},
    shippingPrice:{type: Number, default: 0.0},
    totalPrice:{type: Number, required: true},

    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date,
        
    },
    status:{
        type:String,
        enum:['Pending', 'In Production', 'Quality Check', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    shippedAt:{ type: Date}
},{timestamps: true})

const Order = mongoose.model('orders', orderSchema)

export default Order