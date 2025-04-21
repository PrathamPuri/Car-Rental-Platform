const mongoose=require('mongoose')

function DBconnect(){
    mongoose.connect('mongodb://localhost:27017/carRentalProject')
    const connection=mongoose.connection

    connection.on('connected',()=>console.log('connected'))
    connection.on('error',()=>console.log('not connected'))
}
DBconnect()

module.exports=mongoose