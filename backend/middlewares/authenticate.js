// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncError = require("./catchAsyncError");
// const jwt=require('jsonwebtoken');
// const User=require('../models/userModel');

// exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
//     const {token}=req.cookies;
//     // req.cookies-idha use panna cookie parser install pannanum app.js la
//     // aprm const {token} idhu jwt.js la iruka cookie oda token i.e cookie.token

//     if(!token){
//         return next(new ErrorHandler('Login first! To handle this resource',401))
//     }
//     // token la iruka value decode panniedukrom
//     const decoded=jwt.verify(token, process.env.JWT_SECRET);
//     req.user=await User.findById(decoded.id)
//     next();
// })


// exports.authorizedRoles=(...roles)=>{
//     //...roles neraya roles iruka ellathayum get panna dan ipd panrom
// return (req,res,next)=>{
//     if(!roles.includes(req.user.role)){
//       //req.user already findby id la data get pannirukum  
//    return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
//     }
//     next()
//  }


// }




//copied code
const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
   const { token  }  = req.cookies;
   
   if( !token ){
        return next(new ErrorHandler('Login first to handle this resource', 401))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})

exports.authorizedRoles = (...roles) => {
   return  (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}   