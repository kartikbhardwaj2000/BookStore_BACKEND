const express = require('express');
const router = express.Router();
const {body,validationResult,param}= require('express-validator');
const userController= require('../Controllers/user');

router.get('/getDetails/:userId',param("userId").isLength(24).withMessage("userId contains 24 characters"),async (req,res,next)=>{
  await  userController.getDetails(req,res,next);

})

router.put('/updateProfile/:userId',param("userId").isLength(24).withMessage("userID contains 24 characters"),async(req,res,next)=>{
  await userController.updateProfile(req,res,next);
})

router.post('/notifyUser',body("userId").isLength(24).withMessage("userId contains 24 characters"),
body("targetUserId").isLength(24).withMessage("targetUserId contains 24 characters"),
body("bookId").isLength(24).withMessage("bookId contains 24 characters"),async (req,res,next)=>{
 await userController.notifyUser(req,res,next);
})

router.post('/addFavourite',body("userId").isLength(24).withMessage("userId contains 24 characters"),
body("bookId").isLength(24).withMessage("bookId contains 24 characters"),async(req,res,next)=>{
  await userController.addFavourite(req,res,next);
})

router.delete('/removeFavourite',body("userId").isLength(24).withMessage("userId contains 24 characters"),
body("bookId").isLength(24).withMessage("bookId contains 24 characters"),async(req,res,next)=>{
  await userController.removeFavourite(req,res,next);
})

router.post('/getNotifications',body("userId").isLength(24).withMessage("userID contains 24 characters"),async(req,res,next)=>{
  await userController.getNotifications(req,res,next);
})

router.delete('/deleteNotification',body("userId").isLength(24).withMessage("userId contains 24 characters"),
body("notificationId").isLength(24).withMessage("bookId contains 24 characters"),async(req,res,next)=>{
  await userController.deleteNotification(req,res,next);
})


module.exports=router;
