const {sendOtp} = require('../otpAuth');
const {verifyOtp} = require('../otpAuth');
const {body, validationResult} = require('express-validator');
const {BadRequest} = require('../utils/error');

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