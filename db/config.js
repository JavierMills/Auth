const mongoose  = require("mongoose");


mongoose.set('strictQuery', false);

const dbConnection = async() => {
    try {   
 
        await mongoose.connect( process.env.BD_CNN ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Online')
 
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar DB')
    }
}

// 189.144.104.101/32 
// Mills5533824406 
// Mills5533824406

module.exports = {
    dbConnection
}