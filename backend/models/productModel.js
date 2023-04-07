const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot be exceed above 100"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            image: {
            type:String,
            required:true
        }
    }
],
    category:{
        type:String,
        required:[true,"please enter category"],
        enum:{
            values:[
                'Electronics',
                 'Mobile Phones',
                 'Laptops',
                 'Books',
                 'Accessories',
                 'Headphones',
                 'Food',
                 'Clothes/shoes',
                 'Outdoor',
                 'Sports',
                 'Beauty/Health',
                 'Home'    
            ],
            message:"please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller"]
    },
    stock:
    {
        type:Number,
        required:[true,'please enter product stock'],
        maxLength:[20,"product stock cannot exceed 20"]
    },
    numOfReviews:
    {
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
              type: mongoose.Schema.Types.ObjectId,
              ref:'User'
            },
            
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
    }
],
user:{
    type:mongoose.Schema.Types.ObjectId
},

    createdAt:{
        type:Date,
        default:Date.now()
    }
})
// we can create model adhavadhu schema per la oru blueprint tharen adha vachi oru model kudu nu refer panrom
let schema= mongoose.model('product',productSchema);
// idhula iruka product db la iruka name kaga kudukrom
module.exports = schema