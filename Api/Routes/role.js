const express=require('express');
const role=require('../Models/roleSchema');
const bcrypt=require('bcrypt')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const keys=require('../Config/keys')
const router=express.Router();

router.post('/register',(req,res)=>{
    role.findOne({email:req.body.email},(err,currentUser)=>{
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
                      let user = new role({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                      });
                      return user
                        .save()
                        .then(registeredUser => {
                          let payload={subject:registeredUser._id,name:registeredUser.name,email:registeredUser.email}
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
    role.findOne({email:req.body.email},(err,currentUser)=>{
        if(err) console.error(`Error!! ${err}`)
        else{
            if(!currentUser) res.status(401).send(`Invalid Email`)
            else{
                bcrypt.compare(req.body.password, currentUser.password, (err, isMatch) => {
                    if (err) return res.status(500).json(err);
                    if (isMatch) {
                      let payload = { subject: currentUser._id,name:currentUser.name,email:currentUser.email }
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