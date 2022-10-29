const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var otp,mail;
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/login.html");
});
app.post("/",function(req,res)
{
  otp= Math.floor(1000+9000*Math.random());
  mail=req.body.email;
  console.log(mail);
  console.log(otp);
  res.sendFile(__dirname+"/otp-validation.html");
});
app.post("/otp-validation",function(req,res)
{
  var op3=req.body.kishan;
  console.log(op3);
  if(op3==otp)
  {
    res.write("<p>Your email address is "+mail+"</p>");
    res.write("<form action=/>" +  "<input type=submit value=Logout>" + "</form>"  )
    res.send();
  }
  else
  {
    res.sendFile(__dirname+"/error.html");
  }
});
app.post("/error",function(req,res)
{
  res.sendFile(__dirname+"/login.html");
});

app.listen(3000,function()
{
  console.log("Server has started at port 3000");
});
