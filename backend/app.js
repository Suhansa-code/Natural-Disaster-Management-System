console.log("Hello from backend");

const express = require("express");
const mongoose = require("mongoose");
//
const app = express();

//Middleware connection 
app.use("/" , (req, res ,next) => {
    res.send("Mongo-DB is conected");
})

mongoose.connect("mongodb+srv://suhansa2816:CeGgHAqRueGl8QPC@cluster0.jzg8g.mongodb.net/")
.then(() => console.log("Connected to mongodb"))
.then(()=>{
    app.listen(5000);

})
.catch((err) => console.log(err));