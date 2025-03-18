
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/disasterRoutes");
//
const app = express();

//Middleware connection 
app.use(express.json()); 
app.use("/disaster" , router); 

mongoose.connect("mongodb+srv://suhansa2816:CeGgHAqRueGl8QPC@cluster0.jzg8g.mongodb.net/")
.then(() => console.log("Connected to database"))
.then(()=>{
    app.listen(5000);

})
.catch((err) => console.log(err));