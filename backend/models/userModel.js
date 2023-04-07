const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"],
},
email:{
    type:String,
    required:[true,"please enter Email"],
    unique:true,
    validate:[validator.isEmail, "please enter valid Email"]
},
password:{
    type:String,
    required:[true,"please enter password"],
    maxlength:[6,'password cannot exceed more than 6 characters'],
    select:false // idhu epo venumo apo mattum select panni edukradhukaga ella time um varadhu
},
avatar:{
    type:String,
},
role:{
    type:String,
    default:'user'
},
resetPasswordToken:String, // ipd also use panniklam
resetPasswordTokenExpire:Date,
createdAt:{
    type:Date,
    default:Date.now
}
})
/// for hashing password
// pre(save )-middleware fn
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.getJwtToken=function(){
   return jwt.sign({id:this.id}, process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES_TIME
        })   
}
userSchema.methods.isValidPassword = async  function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)

}
userSchema.methods.getResetToken= function(){
       //Generate token
const token=crypto.randomBytes(20).toString('hex');
//hex oru encoding type; indha data crypto fn use panni hexa decimal ah maridum

      //Generate Hash and set resetPasswordToken
this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
//sha256- oru crypto panra algorithm for secure purpose

        //set token expire time
this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
// user ku 30 min tym kudukrom adhuku aprm adhu expire ayidum Date.now()-current time in millisec

return token
}



// user-namma vaikra name, userschema-mela iruka const name
// let model = mongoose.model('User',userSchema);
let model = mongoose.model('User',userSchema);

module.exports= model;


