const express = require('express');
const mongoose = require('mongoose');
const app = express();
// Using dotenv module for .env file
require("dotenv").config({ path: "./config/.env" });
//importing the User model
const User = require('./models/User')

//Connection to database
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if (err) {
        throw err
    }
    console.log('database connected')
});

//Middleware to parse body
app.use(express.json())

//Get the list of users
app.get('/listOfUsers', function(req, res) {
    User.find()
    .then(users=>res.json(users))
    .catch(err=>console.log(err.message))
});

//Add new user
app.post('/newUser',(req,res)=>{
    const {name,userName,email,phone} = req.body
    let newUser = new User({name,userName,email,phone})
    newUser.save()
    .then(()=>res.json({msg : 'user added'}))
    .catch(err=> console.log(err.message))
})

//Edit user by id
app.put('/editUser/:id',(req,res)=>{
    User.findByIdAndUpdate(req.params.id,{$set :{...req.body}},(err,data)=>{
        if (err){
            throw err
        }
        // we can use res.json(data) but it'd have some tiny issues
        User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => console.log(err.message))
    })})
    

// Delete user by id
app.delete('/deleteUser/:id',(req,res)=>{
   User.findByIdAndDelete(req.params.id)
   .then(()=> res.json({msg : 'Contact deleted'}))
   .catch(err => console.log(err.message))
})

//Port creation
app.listen(4000,(err)=>{
    if (err){
        throw err
    }
    console.log('Connected to port 4000')
})