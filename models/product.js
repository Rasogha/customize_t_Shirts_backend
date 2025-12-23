import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        default: "https://in.pinterest.com/himanshupanshul/t-shirts/"
    },
    basePrice:{
        type: Number,
        required: true
    },

    category:{      //Men,Women,Kids,Hoodies
        type: String,
        required: true
    },
    sizes:{          //S,M,L,XL
        type: [String],
        required: true
    },
    colors:{        //Red,Blue,Green
        type: [String],
        hex: String,
        default: "#000000",
        required: true
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    }
})

const Product = mongoose.model('products', productSchema)
export default Product