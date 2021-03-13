const mongoose = require('mongoose');


let getTimeStamp = () => {
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
  
    return year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
  }
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
           senderName:{type:String , required:true},
           message:{type:String,default:"I am interested in buying your book! Lets chat"},
           timeStamp:{type:String, default: getTimeStamp()} 
       }
   ]
});

const users = mongoose.model('user',userSchema);
module.exports=users;