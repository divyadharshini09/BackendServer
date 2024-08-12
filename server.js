const express = require("express")
const app = express();
const mongoose = require('mongoose')
const userModel=require('./Models/users')

const cors = require('cors')

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://727722euec043:divya890ece@cluster0.jcsly.mongodb.net/data01'
);

app.get("/getUsers",(req, res)=>{
      userModel.find({}).then(result=>{
        res.json(result);
      }).catch(err=>{
        res.json(err);
      });
});
app.post("/loginUser", (req,res) =>{
  const {email,password}=req.body;
  userModel.findOne({email: email})
  .then(user => {
    if(user){
      if(user.password === password){
        res.json("Success")
      } else{
        res.json("the password is incorrect")
      }
    }
    else{
      res.json("No user exist")
    }
  })

})
app.post("/createUser",(req,res)=>{
   userModel.create(req.body)
   .then(user => res.json(user))
   .catch(err => res.json(err))
});

app.listen(3001,()=>{
    console.log("Server runs perfectly!");
});