const express = require('express');
const router = express.Router();
const {body,validationResult,param}= require('express-validator');
const userController= require('../Controllers/user');

router.get('/getDetails/:userId',param("userId").isLength(24).withMessage("userId contains 24 characters"),async (req,res,next)=>{
  await  userController.getDetails(req,res,next);

})

module.exports=router;