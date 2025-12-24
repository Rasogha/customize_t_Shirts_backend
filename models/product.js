import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    //image of BLANK Tshirt
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
    colors:[{        //Red,Blue,Green
        name:{ type: String, required: true },
        hexCode:{ type: String, required: true }
    }],
    countInStock:{
        type: Number,
        required: true,
        default: 0
    },
    printableArea:{
        x:{type: Number, default: 30},
        y:{type: Number, default: 20},
        width:{type: Number, default: 40},
        height:{type: Number, default: 50}
    }
},{timestamps: true})

const Product = mongoose.model('products', productSchema)
export default Product