// const express = require('express');
// const app = express();
// const cors = require('cors');
// const controller = require('./controller');

// app.use(cors());

// app.use(
//     express.urlencoded(
//         { extended: true }
//     )
// );

// app.use(express.json());

// app.get('/users',(req, res) =>{
//     controller.getUsers(req, res, next =>{ 
//         res.send();
//     });

// });

// app.post('/createuser',(req, res) =>{
//     controller.addUsers(req.body, (callback)=>{
//         res.send();
 
//    });
// });

// app.post('/updateuser',(req, res) =>{
//     controller.updateUser(req.body, (callback)=>{
//         res.send(callback);
 
//    });
// });

// app.post('/deleteuser',(req, res) =>{
//     controller.deleteUserUser(req.body, (callback)=>{
//         res.send(callback);
 
//    });
// });


// module.exports = app;

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/students', studentRoutes);


module.exports = app;

