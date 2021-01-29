const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const User=require('../Models/userSchema');
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

router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email},(err,currentUser)=>{
        if(err) console.error(`Error!${err}`)
        else{
            if(currentUser){
              console.log(currentUser)
              res.status(401).send('Email already exist')
            }
            else{
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return res.status(500).json(err);
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                      if (err) return res.status(500).json(err);
                      let user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                      });
                      return user
                        .save()
                        .then(registeredUser => {
                          let payload={
                            subject:registeredUser._id,
                            name:registeredUser.name,
                            email:registeredUser.email,
                            city:registeredUser.city,
                            canteen:registeredUser.city
                          }
                          let token=jwt.sign(payload,keys.secretKey,{ expiresIn: '365d'})
                          res.status(201).send({token})
                        })
                        .catch(err => {
                          return res.status(500).json(err);
                        });
                    });
                  });
            } 
        }
    })
})

router.post('/login',(req,res)=>{
  User.findOne({ email: req.body.email }, (err, currentUser) => {
    if (err) console.error(`Error!! ${err}`)
    else {
      if (!currentUser) res.status(401).send(`Invalid Email`)
      else {
        bcrypt.compare(req.body.password, currentUser.password, (err, isMatch) => {
          if (err) return res.status(500).json(err);
          if (isMatch) {
            let payload = { 
              subject: currentUser._id,
              name:currentUser.name,
              email:currentUser.email,
              city:currentUser.city,
              canteen:currentUser.canteen
            }
            let token = jwt.sign(payload, keys.secretKey, { expiresIn: '365d' });
            return res.status(200).json({ token });
          }
          return res.status(409).send('Invalid Password');
        });
      }
    }
  })
})

router.get('/detail',verifyToken,(req,res)=>{
  User.findOne({_id:req.userId},(err,user)=>{
    if(err) res.status(501).json(err)
    else res.status(200).json(user)
  })
})

router.get('/citydetails',verifyToken,(req,res)=>{
  User.findOne({_id:req.userId})
      .select('city canteen')
      .exec()
      .then(user=>{ res.status(200).json(user)  })
      .catch(err=>{ res.status(501).json(err)})
})

router.put('/citydetails',verifyToken,(req,res)=>{
  User.findByIdAndUpdate(
    req.userId,
    {
      $set:{
        city:req.body.city,
        canteen:req.body.canteen
      }
    },
    { new:true },
    (err,user)=>{
      if(err) res.status(501).json(err)
      else res.status(200).json(user)
    })
})


module.exports=router