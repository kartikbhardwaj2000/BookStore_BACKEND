const express= require('express');
const router= express.Router();
const {param,body,validationResult} =require('express-validator');
const storeController = require('../Controllers/store');


router.post('/createListing',body("userId").isLength(24).withMessage("userId is a string of 24 characters"),body('bookName').notEmpty().withMessage("book name is absent"),
body('author').notEmpty().withMessage("author name is absent"),
body('price').notEmpty().withMessage(" book price is absent").isFloat().withMessage("book price must be a number "),
body('edition').isInt().withMessage("edition is an int value"),
async(req,res,next)=>{
await storeController.createListing(req,res,next);
})

router.get('/getBookDetail/:bookId',param('bookId').isLength(24).withMessage("bookId contains 24 characters"),async(req,res,next)=>{
    await storeController.getBookDetail(req,res,next);
  })

router.post('/getSearch/',body('searchQuery').notEmpty().withMessage("search query cannot be empty"),async (req,res,next)=>{
      await storeController.getSearch(req,res,next);
})  ;

module.exports=router;