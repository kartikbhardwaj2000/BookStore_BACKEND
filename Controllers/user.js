const User = require('../schemas/users');
const Book=require('../schemas/Books');
const {validationResult} = require('express-validator');
const {NotFound,BadRequest} = require('../utils/error');
const mongoose = require('mongoose');


exports.getDetails=async(req,res,next)=>{
    let Result = validationResult(req);
    let errors= Result.errors;
    try {
        if(!Result.isEmpty())
    {
        throw new BadRequest(errors[0].msg);
    }

    let user = await User.findOne({_id:mongoose.Types.ObjectId(req.params.userId)});
    console.log(user);
    if(!user)
    {
        throw new NotFound('user does not exist');
    }
    let respose={
        status:"success",
        subcode:"200",
        message:"user details fetched successfully",
        body:user,
    }
    res.json({...respose});
    } catch (error) {
        next(error);
    }
    
}

exports.notifyUser=async(req,res,next)=>{

    let Result = validationResult(req);
    let errors= Result.errors;
    let messageArr=[]
    try {
        if(!Result.isEmpty())
    {
        errors.forEach(element => {
            messageArr.push(element.msg);
        });
        throw new BadRequest(messageArr.toString());
    }
    let mongoResp= await User.findOne({_id:mongoose.Types.ObjectId(req.body.userId)});
    let mongoResp2=await User.findOne({_id:mongoose.Types.ObjectId(req.body.targetUserId)});
    let listedBooks=mongoResp2.listedBooks;
    if(!listedBooks)
    {
        throw new BadRequest("targetUser does not own this book");
    }
    
    let book= listedBooks.find((val)=>{
        return val.toString()==(req.body.bookId);
    })
    if(!book)
    {
        throw new BadRequest("targetUser does not own this book");
    }

    if(!mongoResp)
    {
        throw new NotFound("userId does not exist");
    }
    if(!mongoResp2)
    {
        throw new NotFound("targerUserID does not exist");
    }
    let notificationsArr = [...mongoResp2.notifications];

    let notif={
        senderUserId:req.body.userId,
        bookId:req.body.bookId,
        senderName:mongoResp.name,
        message:req.body.message,

    }
    notificationsArr.push(notif);
    let mongoResp3=await User.updateOne({_id:mongoose.Types.ObjectId(req.body.targetUserId)},{
        notifications:notificationsArr
    });
    
     let response={
         status:"success",
         subcode:"200",
         message:"notification delivery successfull",
         body:mongoResp3
     }
     res.json({...response});


}catch(error){
    console.log(error);
    next(error);
}
}

exports.addFavourite=async(req,res,next)=>{
    let Result = validationResult(req);
    let errors= Result.errors;
    let messageArr=[]
    try {
        if(!Result.isEmpty())
    {
        errors.forEach(element => {
            messageArr.push(element.msg);
        });
        throw new BadRequest(messageArr.toString());
    }
    let user= await User.findOne({_id:mongoose.Types.ObjectId(req.body.userId)});
    let book= await Book.findOne({_id:mongoose.Types.ObjectId(req.body.bookId)});
    if(!user)
    {
        throw new NotFound("user does not exist");
    }
    if(!book)
    {
        throw new NotFound("book does not exist");
    }

    let favouriteBooks;
    if(user.favouriteBooks){
        favouriteBooks=[...user.favouriteBooks]
        let favouriteBook = favouriteBooks.find((val)=>{
           return  val.toString()===req.body.bookId;
        });
        if(favouriteBook)
        {
            let response={
                status:"success",
            subcode:"200",
            message:"book already present in favourite",
            
            }
            return res.json({...response});
        }
        
    }else {
        favouriteBooks=[];
    }
    
    favouriteBooks.push(mongoose.Types.ObjectId(req.body.bookId));
    let mongoResp=await User.updateOne({_id:mongoose.Types.ObjectId(req.body.userId)},{
        favouriteBooks:favouriteBooks
    });

    let response={
        status:"success",
        subcode:"200",
        message:"book added to favourite",
        body:mongoResp
    }
    res.json({...response});

    
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getNotifications= async (req,res,next)=>{
try {
    let Result = validationResult(req);
    let errors= Result.errors;
    let messageArr=[]
    if(!Result.isEmpty())
    {
        errors.forEach(element => {
            messageArr.push(element.msg);
        });
        throw new BadRequest(messageArr.toString());
    }

    let user = await User.findOne({_id:mongoose.Types.ObjectId(req.body.userId)});
    if(!user)
    {
        throw new NotFound("user does not exist");
    }
 
    let respone={
        status:"success",
        subcode:"200",
        message:"notifications fetched successfully",
        body:user.notifications
    }
    res.json(respone);

} catch (error) {
    console.log(error);
    next(error);
}
}