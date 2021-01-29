const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  name: {
    type: String,
    match: /^[a-zA-Z ]{2,30}$/,
    required: [true, 'item name is required...!']
  },

  quantity:{
    type:Number,
    required:[true,'item quantity is required..!']
  },

  price: {
    type: Number,
    required: [true, 'item price is required...!']
  },

  description: {
    type: String,
    required: [true, 'item price is required...!']
  },
  
  category:{
    type: String,
    required: [true, 'item category is required...!']
  },
  productImage:{
    type:String,
    required: [true, 'item image is required...!']
  },

  sellerId:{
    type:mongoose.Schema.Types.ObjectId,
    required: [true, 'item name is required...!']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports= mongoose.model('Items', itemSchema);