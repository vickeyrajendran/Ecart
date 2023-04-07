const products=require('../data/product.json');
const Product=require('../models/productModel');
const dotenv=require('dotenv')
const connectDatabase=require('../config/database')



dotenv.config({path:("backend/config/config.env")});
connectDatabase();


    // delete all the db values and insert all the values from the product file
const seedProduct=async()=>{
    // product oru promise return pannudhu (adan green clr)so await use panrom
   try{
    await Product.deleteMany();
   console.log('All products Deleted');
   await Product.insertMany(products);
   console.log("All are inserted");
   }catch(error){
    console.log(error.message);
   }
   process.exit();  //for exit the process after finished

}
seedProduct();
