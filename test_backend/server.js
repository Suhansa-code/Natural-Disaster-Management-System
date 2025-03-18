// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port =3002;
// const host = 'localhost';
// const mongoose = require('mongoose'); 
// const router = require('./router');   

// app.use(cors());

// app.use(express.json());

// const uri ='mongodb+srv://shakinirmad:testreactapp@cluster0.tpgqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const connect =async() => {
//     try {
//        await mongoose.connect(uri);
//        console.log('Connected to MongoDB'); 
//     }
//     catch(error) {
//         console.log('MongoDB error: ' , error);
//     }
// };

// connect();

// const server = app.listen(port,host,()=>{
//     console.log(`Node Server is running on port ${server.address().port}`)
// });
// app.use('/api', router);

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const loginRoutes = require('./routes/login');

// dotenv.config();

// const app = express();

// // MongoDB connection
// const MONGO_URI = 'mongodb+srv://shakinirmad:testreactapp@cluster0.tpgqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => {
//     console.error(`MongoDB connection error: ${err.message}`);
//     process.exit(1); // Exit the application if the database connection fails
//   });


// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/api/login', loginRoutes);

// // Server configuration
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
// mongoose.connect(process.env.MONGO, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));
mongoose.connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("Disaster Management API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);