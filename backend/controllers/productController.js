const Product=require('../models/productModel');
const ErrorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../middlewares/catchAsyncError')
const APIFeatures=require('../utils/apiFeatures');
 
//getProducts - /api/v1/products
exports.getProducts= catchAsyncError(async (req,res,next)=>{
const resPerPage=3;

let buildQuery = ()=>{
   return new APIFeatures(Product.find(), req.query).search().filter()
}
const filteredProductCount = await buildQuery().query.countDocuments({});
const totalProductsCount = await Product.countDocuments({});
let productsCount =  totalProductsCount;

if(filteredProductCount !== totalProductsCount){
    productsCount = filteredProductCount;
}

 const products=await buildQuery().paginate(resPerPage).query;
    //     await new Promise(resolve => setTimeout(resolve,3000))
// // above line for page loading for 3 sec

    res.status(200).json({
        success:true,
        count:productsCount,
        resPerPage,
        products 
    })
});


// createProduct- /api/v1/products/new
exports.newProduct=catchAsyncError(async(req,res,next)=>{
    let images = [];

    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length>0){
        req.files.forEach(file =>{
            let url = `${BASE_URL}/uploads/product/${file.originalname}`; 
            images.push({image:url}) // image apdngra perla push panrom
        })
    }
    req.body.images = images;

    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    //req.body namma anupra json data va kudukum
    //req.user authenticate.js la iruka user id ya kudukum
    res.status(201).json({
        success:true,
        product
    })
});

  //Get single Product-/api/v1/product/:id
  exports.getSingleProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id).populate('reviews.user','name email');
        // populate('reviews.user','name','email'- reviewss la iruka user la irundu name and email kondu varum

    if(!product){
        //errorhandler la message,sts code tharanum
       return next(new ErrorHandler('product not found',400));

    }
    res.status(201).json({
        success:true,
        product
    })
  });


  //update product -/api/v1/products/:id
  exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    //Uploading Images
    let images = []
    //if images not cleared keep existing images
    if(req.body.imagesCleared === 'false'){
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length>0){
        req.files.forEach(file =>{
            let url = `${BASE_URL}/uploads/product/${file.originalname}`; 
            images.push({image:url}) // image apdngra perla push panrom
        })
    }
    req.body.images = images;

    if(!product){
        return res.status(404).json({
            message:"No product found for this id"
        });
    }
    product=await Product.findByIdAndUpdate(req.params.id, req.body,
    {
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
  }

  //Delete product
  exports.deleteProduct =catchAsyncError(async (req, res, next) =>{
  const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

});

//Create Review - api/v1/review?id={productId}
exports.createReview = catchAsyncError(async (req, res, next) =>{
const { productId, rating, comment} = req.body;

const review = {
    user : req.user.id,
    rating,
    comment
}
// customer already review pannita again update pannanum new va add panna koodahu aduku dan idhu
 const product = await Product.findById(productId);
 const isReviewed = product.reviews.find(review =>{
   return review.user.toString() == req.user.id.toString()
 })
if(isReviewed){
    // updating the review
    product.reviews.forEach(review =>{
        if(review.user.toString() == req.user.id.toString())
        review.comment = comment
        review.rating = rating
    })

}else{
      //creating the review 
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
}

//Finding the average of product reviews
product.ratings  = product.reviews.reduce((acc,review)=>{
return review.rating + acc;
},0) / product.reviews.length;

product.ratings = isNaN(product.ratings)?0:product.ratings;

await product.save({validateBeforeSave:false});
 res.status(200).json({
        success: true
    })

})

//Get reviews - api/v1/reviews
exports.getReviews = catchAsyncError(async (req, res, next) =>{
const product = await Product.findById(req.query.id).populate('reviews.user','name email');
res.status(200).json({
    success: true,
    reviews:product.reviews
})

})

// Delete review- api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.productId);

    //Filtering the reviews which doesnot match the deleting review id
    const reviews = product.reviews.filter(review =>{
    return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews
    const numOfReviews = reviews.length;
 //Finding the average with the filtered reviews
let ratings  = reviews.reduce((acc,review)=>{
    return review.rating + acc;
    },0) / product.reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
       
    })

});


//Get admin products -api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success:true,
        products
    })
});