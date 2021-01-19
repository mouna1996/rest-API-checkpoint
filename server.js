  
const express = require("express")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config()
const userModel = require('./models/User')

//DB connection
mongoose.connect(process.env.CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err.message))

//middleware
app.use(express.json())

// POST :  ADD A NEW USER TO THE DATABASE 
app.post('/addUser', (req, res) => {
    const { name, age, profession } = req.body //destruction
    let newUser = new userModel({ name, age, profession })
    newUser.save()
        .then((user) => res.send(user))
        .catch((err) => console.log(err.message))
})

//GET :  RETURN ALL USERS 
app.get('/allUsers', (req, res) => {
    userModel.find()
        .then(users => res.send(users))
        .catch(err => console.log(err.message))
})

// PUT : EDIT A USER BY ID 
app.put('/updateUser/:_id', (req, res) => {
    const { _id } = req.params
    //const {name,age,profession} = req.body
    userModel.findOneAndUpdate({ _id }, { $set: { ...req.body } })
        .then(() => res.send('User Updated'))
        .catch(err => console.log(err.message))
})


// DELETE : REMOVE A USER BY ID

app.delete('/deleteUser/:_id', (req, res) => {
    const { _id } = req.params
    userModel.findOneAndDelete({ _id })
        .then(() => res.json({ msg: 'User Deleted' }))
        .catch(err => console.log(err.message))

})

//server connection
const port = process.env.PORT || 8000
app.listen(port, err => err ? console.log(err) : console.log(`server is running on port ${port}`))