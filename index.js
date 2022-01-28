const express = require('express');
const res = require('express/lib/response');
const {roomRoute,customer,rooms} = require('./route/roomRoute');
const {bookRoute,bookings} = require('./route/bookingRoute');
//Port on which app will run
const PORT = 3000;

//Importing all packages
const app = express();

//Default config of res req is JSON so using middleware
app.use(express.json());

//ROute of room
app.use('/room',roomRoute);

//Route for booking
app.use('/booking',bookRoute);

app.all('*',(req,res)=>{
    res.json({
        "message":"app is running"
    });
});

app.listen(process.env.PORT || PORT,()=>{console.log("Server started at: "+PORT)})