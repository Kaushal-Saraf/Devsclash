const express =require("express");
const app= express();
const mongoose=require('mongoose');
const cors=require("cors");
const bodyParser=require('body-parser');
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://kaushalsaraf2002:Bctmv37p70Uwjt7O@kaushal310.sjx2w8n.mongodb.net/test').then(e=>{
    console.log("success")
}).catch(err=>{
    console.log(err)
});
const contestSchema=mongoose.Schema({
    title: String,
    difficulty:String,
    duration : String,
    id: String,
    questions: Object,
    startTime:String,
    startTimeHour:String,
    startTimeMinute:String,
    startTimeSecound:String,
    topic: String,
    noOfQuestions:Number,
    participants:Object,
    winner:String

});
const usersSchema = mongoose.Schema({
    name:String,
    user_name: String,
    password: String,
    wallet: Number,
    contest: Object,
});
const contestObjModel = new mongoose.model('contestObjModel',contestSchema);
const userObjectModel = new mongoose.model('userObjectModel',usersSchema);
//signin
app.post("/signin",async(req,res)=>{
    console.log(req.body);
    const data = req.body;
    const newObj = new userObjectModel({...data, name:data.name, user_name:data.user_name, password:data.password});
    newObj.save();
    res.send("done");
});
//login
app.post("/login",async(req,res)=>{
    const {user_name, password}=req.body;
    
    const data = await userObjectModel.find({user_name:user_name});
    console.log(data);
    if(data === null){
        res.send({msg:"user not found"});
    }
    else{
        if(data.password === password){
            res.send({msg:"true",user:data});
        }
    }
    res.send("done");
});

app.get("/",async(req,res)=>{
    var data=await contestObjModel.find({});
    res.json({result:data});
});
app.listen(3000)