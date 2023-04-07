const mongoose=require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        //idhu rendum newmongodb wrk aaga use panrom old edhum interfere aaga koodahu nu
    }).then(con=>{
        console.log(`mongodb connected to the host ${con.connection.host}`);
    })

    
}

module.exports=connectDatabase;