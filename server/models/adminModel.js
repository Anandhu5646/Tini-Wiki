import mongoose from 'mongoose'

const adminSchema=new mongoose.Schema({
    email:{type:String},
    password:{type:String}
})
const adminModel=mongoose.model("admins",adminSchema)


export default adminModel