const bodyParser = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
const Orders=require('../Models/orderSchema');
const jwt=require('jsonwebtoken');
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
router.get('',verifySellerToken,(req,res)=>{
    Orders.find({sellerId:req.sellerId},(err,orderlist)=>{
        if(err) res.status(401).json(err)
        else res.status(200).json(orderlist)  
    })
})

router.get('/user',verifyToken,(req,res)=>{
    Orders.find({UserId:req.userId},(err,order)=>{
        console.log(req.userId,order)
        if(err) res.status(401).json(err)
        else res.status(200).json(order)
    })
})

router.post('/',(req,res)=>{
    let order=new Orders(req.body)
    order.save((err,order)=>{
        if(err) res.status(401).json(err)
        else res.status(200).json(order)
    })
})

router.put('/:id',(req,res)=>{
    console.log(req.body)
    Orders.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status
        },
      },
      { new: true },
      (err, order) => {
        if (err) res.status(401).json(err);
        else res.status(200).json(order);
      }
    );

})

module.exports=router
