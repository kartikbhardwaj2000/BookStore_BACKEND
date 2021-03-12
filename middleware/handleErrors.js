const { GeneralError } =require('../utils/error');

const handleErrors=(err,req,res,next)=>{
    if(err instanceof GeneralError)
    {
        return res.status(err.getCode()).json({
            status:'error',
            subcode:err.getCode(),
            message:err.message
        })
    }

    return res.status(500).json({
        status:'error',
        subcode:500,
        message:err,
    })
}
module.exports=handleErrors;