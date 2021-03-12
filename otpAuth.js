const accountSid="ACe8affabf8186f59e4ffb0dae10474607";
const authToken="d207e74e30fe660b32110d6d1a0dfb24";
const client =require('twilio')(accountSid,authToken);




exports.verifyOtp=(phoneNumber,otpCode)=>{
    
    return new Promise( async(resolve,reject)=>{
        try {
            let result = await client.verify.services("VAa9ea0b0decdde5aef66d358beccdcd3f").verificationChecks.create({
                        to:"+91"+phoneNumber,code:otpCode
                    });
             console.log(result);       
            resolve(result.status);
        } catch (error) {
             reject(error);
        }
      
    })
    
}

exports.sendOtp= (phoneNumber)=>{

    return new Promise( async(resolve,reject)=>{
        try {
        let result=  await client.verify.services("VAa9ea0b0decdde5aef66d358beccdcd3f").verifications.create({
                to:'+91'+phoneNumber,channel:'sms'
            })
            resolve(result.status);
        } catch (error) {
            reject(error.message);
        }
    })
    
}


