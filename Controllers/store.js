const mongoose = require('mongoose');
const {param,validationResult} =require('express-validator');
const {BadRequest,NotFound} =require('../utils/error');
const Book = require('../schemas/Books');
const User= require('../schemas/users');

exports.createListing=async (req,res,next)=>{
    let Result = validationResult(req);
    let errors= Result.errors;
    try {
        if(!Result.isEmpty())
        {
            let messageArr=[];
            errors.forEach(element => {
             messageArr.push(element.msg);

            });
        throw new BadRequest(messageArr.toString());
        }
        let user= await User.findOne({_id:mongoose.Types.ObjectId(req.body.userId)});
        if(!user)
        {
            throw new NotFound("user does not exist");
        }
        let listedBy= mongoose.Types.ObjectId(req.body.userId);
        req.body.price =parseFloat(req.body.price);
        req.body.edition=parseInt(req.body.edition);
        if(req.body.quantity)
        {
            req.body.quantity=parseInt(req.body.quantity);
        }
        let book={...req.body,listedBy:listedBy};
        book.location=user.location;
        
        
        
        let doc = (await Book.create({...book}))._doc;
        console.log(user);
        let listedBooks;
        if(user.listedBooks)
        {
            listedBooks =[...user.listedBooks];
        }else listedBooks=[];
        
        listedBooks.push(mongoose.Types.ObjectId(doc._id));
        let doc2= (await User.updateOne({_id:mongoose.Types.ObjectId(req.body.userId)},{
         listedBooks:listedBooks
        }));
        console.log(doc2);
        let response={
            status:"success",
            subcode:"200",
            message:"book added to user successfully",
            doc:doc2
            
        }
        res.json(response);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getBookDetail=async (req,res,next)=>{
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
        let mongoResp=await Book.findOne({_id:mongoose.Types.ObjectId(req.params.bookId)});
        if(!mongoResp)
        {
            throw new NotFound("book does not exist");
        }

        let bookOwner= await User.findOne({_id:mongoResp.listedBy});
        let response ={
            status:"success",
            subcode:"200",
            message:"book fetched successfully",
            owner:bookOwner,
            book:mongoResp
        }
        res.json({...response});

    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.getSearch= async (req,res,next)=>{
    let Result = validationResult(req);
    let errors= Result.errors;
    try {
        if(!Result.isEmpty())
        {
            let messageArr=[];
            errors.forEach(element => {
             messageArr.push(element.msg);

            });
        throw new BadRequest(messageArr.toString());
        }
    let totalBooks=  await Book.find({$text:{$search:req.body.searchQuery}});
    res.json(totalBooks);

    } catch (error) {
        console.log(error);
        next(error);
    }
  
   
}