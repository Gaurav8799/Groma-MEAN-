const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');
const cart=require('../Models/cartSchema');
const keys=require('../Config/keys');

const router=express.Router();

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
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

function verifySellerToken(req,res,next){
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
    req.sellerId=payload.subject
    next()
  }

router.get('/:sellerId',verifyToken,(req,res)=>{
    cart.find({UserId:req.userId,sellerId:req.params.sellerId},(err,cartItems)=>{
        if(err) res.status(401).json(err)
        else res.status(200).json(cartItems)
    })
})

router.post('/',verifyToken,(req,res)=>{
    let newItem=new cart({
        UserId:req.userId,
        sellerId:req.body.sellerId,
        name:req.body.name,
        quantity:1,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        productImage:req.body.productImage,
        productId:req.body._id
    })
    cart.find({UserId:req.userId,productId:req.body._id},(err,presentItem)=>{
        if(err) res.status(404).json(err)
        else {
            if(presentItem.length!=0) console.log(presentItem)
            else{
                newItem.save((err,addedItem)=>{
                    if(err) res.status(401).json(err)
                    else res.status(200).json(addedItem)
                })
            }
        }
    })
    
})

router.delete('/:id',verifyToken,(req,res)=>{
    cart.findByIdAndRemove(req.params.id,(err,delItem)=>{
        if(err) res.status(404).json(err)
        else res.status(200).json({delItem,msg:'Item delete successfully'})
    })
})

router.put('/:id',verifyToken,(req,res)=>{
    cart.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
               name:req.body.name,
               quantity:req.body.quantity, 
               price:req.body.price, 
               category:req.body.category, 
               
            }
        },
        { new: true },
        (err, updatedItem) => {
            if (err) res.status(401).json(err);
            else res.status(200).json(updatedItem);
      }
    )
})

module.exports=router