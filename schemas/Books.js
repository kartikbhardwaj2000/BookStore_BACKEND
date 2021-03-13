const mongoose = require('mongoose');




let getTimeStamp = () => {
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
  
    return year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
  };
const Book = new mongoose.Schema({
    bookName:{type:String, required:true},
    author:{type:String,required:true},
    edition:{type:Number,required:true},
    subject:String,
    level:String,
    condition:String,
    listedBy:{type:mongoose.Types.ObjectId,required:true},
    location:{
        state:String,
        city:String,
    },
    photoUri:[String],
    price:{type:Number, required:true},
    description:String,
    listedDate:{type:String, default:getTimeStamp()}
});

const bookModel =  mongoose.model("book",Book);
module.exports=bookModel;