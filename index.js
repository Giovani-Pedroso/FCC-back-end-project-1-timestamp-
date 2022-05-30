// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//is need to work if the heroku
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res)=>{
    const dateParam =req.params.date;
    console.log("date param: ", dateParam);
    const time = new Date(dateParam);
    let isnum = /^\d+$/.test(req.params.date);

    
    if(dateParam == undefined){
        const date = new Date();
        res.json({"unix":date.getTime(), utc: date.toUTCString()});
    }
    
    if(isnum){
        console.log("only have numbers");
        const uinx = parseInt(req.params.date);
        const date = new Date(uinx);
        if(date =="Invalid Date") res.json({ error : "Invalid Date"});
        console.log(uinx);
        res.json({"unix":uinx, utc: date.toUTCString()});
    } 

    if(time =="Invalid Date") res.json({ error : "Invalid Date"});

    res.json({"unix":time.getTime(),"utc":time.toUTCString()});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
