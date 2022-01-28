const express = require('express');
const bookRoute = express.Router();

//Demo data for bookings
const bookings = [
    {
      customerName: 'Darshan',
      roomName: 'second',
      date:new Date(2022, 2, 9),
      startTime: new Date(2022, 2, 22, 11,30,0),
      endTime: new Date(2022, 2, 27, 11,30,0),
      roomId: 2
    },
    {
      customerName: 'Sachin',
      roomName: 'first',
      date:new Date(2022, 2,2),
      startTime: new Date(2022, 1, 1, 11,30),
      endTime: new Date(2022,1, 5, 11,30),
      roomId: 1
    }
  ];

  //To get all bookings
bookRoute.get('/',(req,res)=>{
    res.json(bookings);
});

//Post request to create a new booking. In case of date and room overlap it will throw an error
bookRoute.post('/create',(req,res)=>{
  let data = req.body;
  let ddate = data.date.split(',');
  let sdArr = data.startTime.split(',');
  let edArr = data.endTime.split(',');  
  let dateObj = new Date(ddate[0],ddate[1],ddate[2]);
  let startObj = new Date(sdArr[0],sdArr[1],sdArr[2],sdArr[3],sdArr[4]);
  let endObj = new Date(edArr[0],edArr[1],edArr[2],edArr[3],edArr[4]);
  let op = bookings.filter(val=>{
    if(val.roomId==data.roomId||val.roomName==data.roomName)
      {
        if(val.startTime.getFullYear()===startObj.getFullYear()||val.endTime.getFullYear()===endObj.getFullYear())
          if(val.startTime.getMonth()===startObj.getMonth()||val.endTime.getMonth()===endObj.getMonth())
            if((startObj.getDate()>=val.startTime.getDate()&&startObj.getDate()<=val.endTime.getDate())||
              (endObj.getDate()>=val.startTime.getDate()&&endObj.getDate()<=val.endTime.getDate()))
                {return true;}
      }

    return false;
  });

  //It will check of overlap condition , if found filter will catch it and if its length is more than 0 
  //then we send corresponding response, else data is added to bookings
  if(op.length===0){
    data.date=dateObj;
    data.startTime=startObj;
    data.endTime=endObj;
    bookings.push(data);
    res.json({
      "message":"Added Booking!",
      "data":req.body
    });
  }
  else{
    res.json({
      "message":"Booking date unavailable!!",
      "data":req.body
    });
  }
  });

module.exports={bookRoute,bookings};