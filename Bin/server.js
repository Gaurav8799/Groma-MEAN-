const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const cors=require('cors');
require('../Api/Config/database');  //to run database

//Routes Import
const user=require('../Api/Routes/user');
const role=require('../Api/Routes/role');
const seller=require('../Api/Routes/seller');
const items=require('../Api/Routes/items');
const cart=require('../Api/Routes/cart');
const order=require('../Api/Routes/order');

const PORT=3000;

const app=express()

app.use(cors());
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))

// app.use('/api',api)
app.use('/user',user)
app.use('/admin',role)
app.use('/items',items)
app.use('/cart',cart)
app.use('/order',order)
app.use('/seller',seller)


app.listen(PORT,()=>{
    console.log(`You are listening to port:${PORT}`)
}) 