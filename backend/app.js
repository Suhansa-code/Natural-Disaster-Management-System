
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/disasterRoutes");
//
const app = express();

//Middleware connection disater management
app.use(express.json()); 
app.use("/disaster" , router); 

//Middleware connection comunity support




//Middleware connection disaster funding




//Middleware connection admin dashbord




//Middleware connection main components


































































app.use("/" , (req, res ,next) => {
    res.send("Mongo-DB is conected");
})


mongoose
    .connect(
        "mongodb+srv://suhansa2816:CeGgHAqRueGl8QPC@cluster0.jzg8g.mongodb.net/"
    )
.then(() => console.log("Connected to mongodb"))
.then(()=>{
    app.listen(5000);

})
.catch((err) => console.log(err));