const sendToken=(user, statusCode, res)=>{

    // creating jwt token
const token=user.getJwtToken();

    // setting cookies
const options={
    expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 *60 *1000),
    // (i.e 7* 24 * 60 *60 *1000= 7days in milliseconds)
    httpOnly:true
}




res.status(statusCode)
.cookie('token',token,options)
.json({
    suceess:true,
    user,
    token
})

}

module.exports=sendToken;