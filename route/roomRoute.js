const express = require('express');
const roomRoute = express.Router();

//Demo data for rooms
const rooms = [
    {
        id:1,
        roomName:'first',
        seatsAvailable:100,
        amenities:['stage','sound system','fans'],
        price:1000,
    },
    {
        id:2,
        roomName:'second',
        seatsAvailable:200,
        amenities:['chairs','changing room','AC'],
        price:2000
    },
    {
        id:3,
        roomName:'third',
        seatsAvailable:300,
        amenities:['lighting','washroom','food'],
        price:3000
    },
    {
        id:4,
        roomName:'fourth',
        seatsAvailable:400,
        amenities:['cooler','water','2 exits'],
        price:4000
    }
];

//Post request to create a room
roomRoute.post("/create", (req, res) => {
  let count = rooms.filter((val) => val.id == req.body.id);
  if (count == 0) {
    rooms.push(req.body);
    res.json({
      message: "Room successfully added !",
      room:rooms
    });
  } else
    res.json({
      message: "Room Id already present !",
      room:rooms
    });
});

//Get request to get all rooms
roomRoute.get('/',(req,res)=>{
    res.send(rooms) ;  
})

module.exports={roomRoute,rooms};