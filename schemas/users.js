const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {type:String, required:true},
   phoneNumber:{type:String, required:true},
   listedBooks:[mongoose.Types.ObjectId],
   location:{state:String, city: String},
   favouriteBooks:[mongoose.Types.ObjectId],
   photoUri:String,
   notifications:[
       {
           bookId:{type:mongoose.Types.ObjectId , required:true},
           senderUserId:{type:mongoose.Types.ObjectId , required:true},
           userName:{type:String , required:true},
           message:String,
           date:{type:Date, default: Date.now} 
       }
   ]
});

const users = mongoose.model('user',userSchema);
module.exports=users;