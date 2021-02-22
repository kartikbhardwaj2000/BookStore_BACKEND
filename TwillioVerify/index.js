const accountSid="ACe8affabf8186f59e4ffb0dae10474607";
const authToken="d207e74e30fe660b32110d6d1a0dfb24";
const client =require('twilio')(accountSid,authToken);

client.verify.services("VAa9ea0b0decdde5aef66d358beccdcd3f").verifications.create({
    to:'+919094495400',channel:'sms'
}).then(result=>{
    console.log(result.status);
})