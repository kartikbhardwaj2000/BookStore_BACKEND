const {sendOtp} = require('../otpAuth');
const {verifyOtp} = require('../otpAuth');
const {body, validationResult} = require('express-validator');
const {BadRequest} = require('../utils/error');
const Users = require('../schemas/users');

exports.sendOtp= async (req,res,next)=>{
    let Result = validationResult(req);
    let errors=Result.errors;
    try {
        if(!Result.isEmpty())
        {
           throw new BadRequest(errors[0].msg);
        }
         let phoneNumber = req.body.phoneNumber;
        await sendOtp(phoneNumber);
        
        res.json({status:"success",subcode:"200",message:`otp sent to ${phoneNumber} successfully`})
    } catch (error) {
        next(error);
    }
   
}

exports.verifyOtp=async (req,res,next)=>{
    let Result = validationResult(req);
    let errors=Result.errors;
    try {
        console.log(errors);

        if(!Result.isEmpty())
        {
            let message="";
            errors.forEach(element => {
            message = message.concat(element.msg," ");

            });
           throw new BadRequest(message);

        }
         let phoneNumber = req.body.phoneNumber;
         let otpCode =req.body.otpCode;
         let status = await verifyOtp(phoneNumber,otpCode);

        let message = status==="approved"?"otp approved":"wrong otp entered"
        res.json({status:"success",subcode:"200",message:message,authorised:status})
    } catch (error) {
        next(error);
    }
}

exports.signUp= async(req,res,next)=>{
    console.log("req received=>",req.body);

    let Result = validationResult(req);
    let errors=Result.errors;

    try {
        if(!Result.isEmpty())
            {
                let message="";
                errors.forEach(element => {
                message = message.concat(element.msg," ");

                });
            throw new BadRequest(message);
            }

            
        let oldUser = await Users.findOne({"phoneNumber":req.body.phoneNumber});
        if(oldUser)
        {
            throw new BadRequest("phone number already registered");
        }
        let doc = (await Users.create(req.body))._doc;
        let response ={
            status:"success",
            subcode:"200",
            message:"user added successfully",
            doc:doc,
 }
  
    res.json({...response});

    } catch (error) {
        next(error);
    }
    

}

exports.login= async(req,res,next)=>{
    let Result = validationResult(req);
    let errors=Result.errors;
    try {
        if(!Result.isEmpty())
        {
           throw new BadRequest(errors[0].msg);
        }

        let user = await Users.findOne({phoneNumber:req.body.phoneNumber});
        if(!user)
        {
            throw new BadRequest("Phone no not registered");
        }

       
        res.json({status:"success",subcode:"200",message:"user account exists"});
    } catch (error) {
        next(error);
    }
   

}