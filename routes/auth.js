//External Dependencies
const express= require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

//Our own dependencies
const authController = require('../Controllers/auth')


router.post('/sendOtp',body('phoneNumber').isLength({max:10,min:10}).withMessage((value)=>{
    return `phone no must be of length 10, but received ${value}`
}),(req,res,next)=>{
    authController.sendOtp(req,res,next);
}
)

router.post('/verifyOtp',body('phoneNumber').isLength({max:10,min:10}).withMessage((value)=>{
    return `phone no must be of length 10, but received ${value}`
}),body('otpCode').isLength({max:6,min:6}).withMessage((value)=>{
    return `otp code must be of length 6, but received  ${value}`
}), async(req,res ,next)=>{
  await authController.verifyOtp(req,res,next);
})

router.post('/signup',body('name').notEmpty().withMessage('name should pe present'),body('phoneNumber').isLength({max:10,min:10}).withMessage((value)=>{
    return `phone no must be of length 10, but received ${value}`
}),async (req,res,next)=>{

await authController.signUp(req,res,next);
})

router.post('/login',body('phoneNumber').isLength({max:10,min:10}).withMessage((value)=>{
    return `phone no must be of length 10, but received ${value}`
}),async (req,res,next)=>{
  await  authController.login(req,res,next);
})


module.exports=router;