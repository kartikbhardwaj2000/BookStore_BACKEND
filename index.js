const express = require('express');
const mongoose =require('mongoose');
const app = express();

const auth = require('./routes/auth')
const user=require('./routes/user')
const store =require('./routes/store');
const handleErrors =require('./middleware/handleErrors')

const port = process.env.PORT||3008;

app.use(express.json())

app.use('/auth',auth);
app.use('/user',user);
app.use('/store',store);

// app.use('/',(req,res)=>{
//     res.send("Welcome to Book Store")
// })
app.use(handleErrors);

const MONGODB_URI='mongodb+srv://kartikbhardwaj016:k30082000@cluster0.punkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI).then(res=>{
    app.listen(port,()=>{
        console.log("server has started");
    })
}).catch(err=>{
    console.log(err);
})
