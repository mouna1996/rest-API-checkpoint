const mongoose=require('mongoose')
const schema = mongoose.Schema


const UserSchema = new schema({
    name : String,
    age: Number,
    profession : String
})

module.exports = mongoose.model('User',UserSchema)