const mongoose = require('mongoose');
const {validationResult} =require('express-validator');
const {BadRequest,NotFound} =require('../utils/error');
const Books = require('../schemas/Books');
const Users= require('../schemas/users');

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
        let user= await Users.findOne({_id:mongoose.Types.ObjectId(req.body.userId)});
        if(!user)
        {
            throw new NotFound("user does not exist");
        }
        let listedBy= mongoose.Types.ObjectId(req.body.userId);
        req.body.price =parseFloat(req.body.price);
        req.body.edition=parseInt(req.body.edition);
        let book={...req.body,listedBy:listedBy};
        book.location=user.location;
        
        
        
        let doc = (await Books.create({...book}))._doc;
        console.log(user);
        let listedBooks;
        if(user.listedBooks)
        {
            listedBooks =[...user.listedBooks];
        }else listedBooks=[];
        
        listedBooks.push(mongoose.Types.ObjectId(doc._id));
        let doc2= (await Users.updateOne({_id:mongoose.Types.ObjectId(req.body.userId)},{
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