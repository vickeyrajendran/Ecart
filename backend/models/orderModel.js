const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shippingInfo :{
        address:{
                type: String,
                required:true
        },
        country:{
            type: String,
            required:true
    },
        city:{
        type: String,
        required:true
},
phoneNo:{
    type: Number,
    required:true
},
postalCode:{
    type: Number,
    required:true
},      
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems:[{
        name:{
                type: String,
                required:true
        },
        quantity:{
            type: Number,
            required:true
    },
    image:{
        type: String,
        required:true
},
price:{
    type: Number,
    required:true
},
product:{
    type: mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'Product'
}
 }],
 itemsPrice:{
    type:Number,
    required:true,
    default: 0.0
 },
 taxPrice:{
    type:Number,
    required:true,
    default: 0.0
 },
 shippingPrice:{
    type:Number,
    required:true,
    default: 0.0
 },
 totalPrice:{
    type:Number,
    required:true,
    default: 0.0
 },
 paymentInfo:{
    id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
   
   
 },
 paidAt:{
    type:Date
 },
 deliveredAt:{
    type:Date
 }, 
 orderStatus:{
    type:String,
    required:true,
    default:'Processing '
 },
 createdAt:{
    type:Date,
    default:Date.now
 }
})

let orderModel = mongoose.model('Order',orderSchema);

module.exports = orderModel;




 // postman api sample datas
    // {"orderItems": [
    //     {
    //         "product": "63ff50682845205a97f95183",
    //         "name": "PTron Newly Launched Tangent Sports, 60Hrs Playtime",
    //         "price": 15.46,
    //         "image":"product.jpg",
    //         "quantity":1
    //     }],
    //     "itemsPrice": 55,
    // "taxPrice": 60,
    // "shippingPrice":23,
    // "totalPrice": 30,
    // "shippingInfo":{
    //     "address":"133",
    //     "city":"palani",
    //       "country":"palani",
    //         "postalCode":624617,
    //            "phoneNumber":624617
        
    // },
    // "paymentInfo":{
    //     "id":"popopoopopopopopop",
    //     "status":"success"
    // }
        
        
    //     }