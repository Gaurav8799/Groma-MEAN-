const express=require('express');
const seller=require('../Models/sellerSchema');
const bcrypt=require('bcrypt')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const keys=require('../Config/keys')
const router=express.Router();

router.post('/register',(req,res)=>{
    seller.findOne({email:req.body.email},(err,currentUser)=>{
        if(err) console.error(`Error!${err}`)
        else{
            if(currentUser){
              res.status(401).send('Email already exist')
            }
            else{
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return res.status(500).json(err);
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                      if (err) return res.status(500).json(err);
                      let user = new seller({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        city: req.body.city,
                        password: hash
                      });
                      return user
                        .save()
                        .then(registeredUser => {
                          let payload={subject:registeredUser._id,name:registeredUser.name,email:registeredUser.email,city:registeredUser.city}
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

router.get('/:city',(req,res)=>{
  seller
      .find({city:req.params.city})
      .select('name')
      .exec()
      .then(canteen=>res.status(200).json(canteen) )
      .catch(err=>res.status(401).json(err))
})

router.post('/login',(req,res)=>{
    seller.findOne({email:req.body.email},(err,currentUser)=>{
        if(err) console.error(`Error!! ${err}`)
        else{
            if(!currentUser) res.status(401).send(`Invalid Email`)
            else{
                bcrypt.compare(req.body.password, currentUser.password, (err, isMatch) => {
                    if (err) return res.status(500).json(err);
                    if (isMatch) {
                      let payload = { subject: currentUser._id,name:currentUser.name,email:currentUser.email,city:currentUser.city }
                      let token = jwt.sign(payload,keys.secretKey,{ expiresIn: '365d'});
                      return res.status(200).json({token});
                    }
                    return res.status(409).send('Invalid Password');
                }); 
            }
        }
    })
}) 


module.exports=router