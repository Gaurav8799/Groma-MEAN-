const bodyParser = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
const Items=require('../Models/itemSchema');
const multer=require('multer');
const jwt=require('jsonwebtoken');
const keys=require('../Config/keys');

function verifyToken(req,res,next){
  if(!req.headers.sellerauthorization){
      return res.status(401).send('Unauthorized request')
  }
  let token=req.headers.sellerauthorization.split(' ')[1]
  if(token=='null'){
      return res.status(401).send('Unauthorized request')
  }
  let payload=jwt.verify(token,keys.secretKey)
  if(!payload){
      return res.status(401).send('Unauthorized request')
  }
  req.userId=payload.subject
  next()
}

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename:function(req,file,cb){
    // cb(null,Date.now() +file.originalname);
    const now = new Date().toISOString(); 
    const date = now.replace(/:/g, '-'); 
    cb(null, date + file.originalname);
  }
});//allows you to how files gets stores 
// const upload=multer({dest:'uploads/'}); where multer will store incoming file...by default folder this accessible publically

const fileFilter=(req,file,cb)=>{
  //reject a file
  if(file.mimetype==='image/jpeg'||file.mimetype==='image/png') cb(null,true)
  else cb(new Error('Do not accept image other than jpeg & png'),false)
}
const upload=multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*5
  },
  fileFilter:fileFilter
})
const router=express.Router();

//get all the items
router.get('/',verifyToken,(req,res)=>{
    Items
        .find({sellerId:req.userId})
        .select('_id name price quantity date productImage category description')
        .exec()
        .then(item=>{
            if(item.length<1){
                return res.status(404).send('No item present');
            }
            else{
                return res.status(200).json(item);
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        })
})

router.get('/seller/:seller',(req,res)=>{
    Items
        .find({sellerId:req.params.seller})
        .select('_id name price quantity date productImage category description')
        .exec()
        .then(item=>{
            if(item.length<1){
                return res.status(404).send('No item present');
            }
            else{
                return res.status(200).json(item);
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        })
})


router.get('/:id',(req,res)=>{
  Items.find({_id:req.params.id},(err,item)=>{
    if(err) res.status(401).json(err)
    else if(item.length>0) res.status(200).json(item[0])
    else res.status(200).send(`No item found`)
  })
})

router.post('/',verifyToken, upload.single('image'), (req, res) => {    //single means we will get single file only...specify the name of field that will hold the filed                                       // req.file available due to upload.single()
  let NewItem = new Items({
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity,
    description:req.body.description,
    category:req.body.category,
    productImage:req.file.path,
    sellerId:req.userId
  })
  NewItem.save((err, NewItem) => {
    if (err) res.status(500).json(err)
    else res.status(201).json({ NewItem, Message: 'Item added succesfully' })
  })
})

router.put('/:id',upload.single('image'),(req,res)=>{
    Items.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
          category: req.body.category,
          description:req.body.description,
          productImage:req.file.path
        },
      },
      { new: true },
      (err, updatedItem) => {
        if (err) res.status(401).json(err);
        else res.status(200).json(updatedItem);
      }
    );

})
router.put('/qty/:id',(req,res)=>{
    Items.findByIdAndUpdate(
      req.params.id,
      { $inc: {'quantity':-req.body.quantity } },
      { new: true },
      (err, updatedItem) => {
        if (err) res.status(401).json(err);
        else res.status(200).json(updatedItem);
      }
    );

})

router.delete('/:id',(req,res)=>{
    Items.findByIdAndDelete(req.params.id,(err,deletedItem)=>{
        if(err) res.status(401).json(err)
        else res.status(200).json(deletedItem)
    })
})

router.post('/search',(req,res)=>{
    let searchObj=req.body
    // Items.find({name: { $regex: /.*Oo.*/i },category:'Biscuit' },(err,item)=>{
    if(searchObj.category=="All") {
      Items.find(
        {
          name: new RegExp(searchObj.searchValue, "i"),
          sellerId:req.body.sellerId
        },
        (err, item) => {
          //     category: {
          //         $cond: { if: { $eq: [searchObj.category, 'All' ] }, then: 'All', else: searchObj.category  }
  
          if (err) res.status(401).json(err);
          else res.status(200).json(item);
        }
      );
    } 
    else{
      Items.find(
        {
          name: new RegExp(searchObj.searchValue, "i"),
          category: searchObj.category,
        },
        (err, item) => {
          //     category: {
          //         $cond: { if: { $eq: [searchObj.category, 'All' ] }, then: 'All', else: searchObj.category  }
  
          if (err) res.status(401).json(err);
          else res.status(200).json(item);
        }
      );
    }
    
})

module.exports=router