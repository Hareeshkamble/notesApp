let mongoose =require("mongoose")
const {Schema}=mongoose;
  const NotesSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
 title:{
  type:String,
  required:true
 },
 description:{
  type:String,
  required:true
 },

 tag:{
  type:String,
  defalut:"general"
 },
 date: {
  type: Date,
  default: Date.now,
}
  })
let Notes=mongoose.model("Notes",NotesSchema)
Notes.createIndexes()
  module.exports=Notes