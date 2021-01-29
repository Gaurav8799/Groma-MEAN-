const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const sellerSchema=new Schema({
    name: {
        type: String,
        match: /^[a-zA-Z ]{2,30}$/,
        required: [true, 'name is required...!']
      },
    
      email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
        lowercase: true,
        required: [true, 'email is required...!']
      },
    
      password: {
        type: String,
        required: [true, 'password is required...!']
      },

      city: {
        type: String,
        required: [true, 'password is required...!']
      },
    
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports=mongoose.model('seller',sellerSchema)