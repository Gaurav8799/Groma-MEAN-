const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
  address: {
    type: String,
    required: [true, 'item name is required...!']
  },

  city:{
    type:String,
    required:[true,'item quantity is required..!']
  },

  state: {
    type: String,
    required: [true, 'item price is required...!']
  },

  pincode: {
    type: String,
    required: [true, 'item price is required...!']
  }
});

module.exports= addressSchema